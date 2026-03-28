import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboards',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './dashboards.html',
  styleUrl: './dashboards.css',
})
export class Dashboards implements OnInit, AfterViewInit {
  role: string = "";
  activeTab: string = 'dashboard';
  isAddUserModalOpen: boolean = false;
  addUserForm: FormGroup;

  // === Edit User Modal ===
  isEditUserModalOpen: boolean = false;
  selectedUser: any = null;
  editUserForm: FormGroup;

  // Storage arrays for users and the content for the dashboard
  allusers: any[] = [];
  filteredUsers: any[] = [];
  recentUsers: any[] = []; // 5 most recently added users for the dashboard widget

  // Filter Models
  searchQuery: string = '';
  roleFilter: string = 'All';

  // Analytics data from backend
  analyticsData: any = null;
  private revenueChart: any = null;
  private roleChart: any = null;

  statTotal: number | string = '...';
  statAdmins: number | string = '...';
  statViewers: number | string = '...';
  statSuperAdmins: number | string = '...';
  statActive: number | string = '...';
  statInactive: number | string = '...';

  // Sales Module
  salesList: any[] = [];
  isAddSaleModalOpen = false;
  isEditSaleModalOpen = false;
  selectedSale: any = null;
  addSaleForm: FormGroup;
  editSaleForm: FormGroup;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    // this code is used to add the new user to the db by the super admin and the admin
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      password1: ['', Validators.required],
      role: ['Viewer', Validators.required],
      isActive: [true]
    }, { validators: this.passwordMatchValidator });

    // Edit form: only Role and Status are editable
    this.editUserForm = this.fb.group({
      role: ['Viewer', Validators.required],
      isActive: [true, Validators.required]
    });

    this.addSaleForm = this.fb.group({
      productName: ['', Validators.required],
      revenue: ['', [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      month: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      year: [2026, Validators.required]
    });

    this.editSaleForm = this.fb.group({
      revenue: ['', [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  // Custom Validator to ensure both passwords match exactly
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('password1')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.role = localStorage.getItem("role") || "";
      this.fetchUsers();
      this.fetchAnalytics(); // only run in browser — needs cookies
      this.fetchRecentUsers(); // newly added route for dashboard users
    }
  }

  // called after the html renders so Chart.js can grab the canvas elements
  ngAfterViewInit() {
    if (this.analyticsData) this.renderCharts();
  }

  switchTab(tabName: string) {
    this.activeTab = tabName;
    // render charts when user switches to the analytics tab
    if (tabName === 'analysis' && this.analyticsData) {
      setTimeout(() => this.renderCharts(), 50);
    }
    if (tabName === 'sales') {
      this.fetchSales();
    }
  }

  addUser() {
    this.isAddUserModalOpen = true; // Open the modal
  }

  closeModal() {
    this.isAddUserModalOpen = false;
    this.addUserForm.reset({ role: 'Viewer', isActive: true }); // Reset form on close
  }

  submitUser() {
    if (this.addUserForm.invalid) {
      alert("Please fill all required fields correctly.");
      return;
    }

    const addUser = {
      name: this.addUserForm.value.name,
      email: this.addUserForm.value.email,
      password: this.addUserForm.value.password,
      role: this.addUserForm.value.role,
      isActive: true, // Force active upon creation
    }

    this.http.post('http://localhost:5000/api/user/adduser', addUser, { withCredentials: true }
    ).subscribe({
      next: (res: any) => {
        alert("User Added Successfully!");
        this.closeModal();
        this.fetchUsers(); // Refresh the table automatically
        this.filterUsers();
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || "Failed to add user. Are you sure you are a Super Admin?");
      }
    });
  }

  // Fetch all users from the DB
  fetchUsers() {
    this.http.get("http://localhost:5000/api/users/allusers", { withCredentials: true }).subscribe({
      next: (res: any) => {
        // The Node.js backend returns `allUsers`, not `data`
        this.allusers = res.allUsers;
        this.filteredUsers = res.allUsers;
        this.filterUsers(); // Re-apply any existing filters
      }
    });
  }

  // fetch only the 5 newest users from the dedicated backend route
  fetchRecentUsers() {
    this.http.get("http://localhost:5000/api/users/recent", { withCredentials: true }).subscribe({
      next: (res: any) => {
        this.recentUsers = res.recentUsers;
        this.cdr.detectChanges();
      }
    });
  }

  // Function to filter the users table dynamically
  filterUsers() {
    this.filteredUsers = this.allusers.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesRole = this.roleFilter === 'All' || user.role === this.roleFilter;

      return matchesSearch && matchesRole;
    });
  }
  // the below code is to delete the user only for the superadmin only
  deleteuser(id: string) {
    if (confirm("Are you sure you want to delete this user?")) {
      this.http.delete(`http://localhost:5000/api/user/deleteuser/${id}`, { withCredentials: true }).subscribe({
        next: (res: any) => {
          alert("User Deleted Successfully..");
          this.fetchUsers();
          this.filterUsers();
        },
        error: (err) => {
          alert("Error: " + (err.error?.message || "Could not delete user."));
        }
      });
    }
  }

  // open edit modal and pre-fill with this user's current values
  editUser(user: any) {
    this.selectedUser = user;
    this.editUserForm.patchValue({
      role: user.role,
      isActive: user.isActive !== false
    });
    this.isEditUserModalOpen = true;
  }

  closeEditModal() {
    this.isEditUserModalOpen = false;
    this.selectedUser = null;
  }

  submitEditUser() {
    if (this.editUserForm.invalid) return;
    const payload = {
      role: this.editUserForm.value.role,
      isActive: this.editUserForm.value.isActive,
    };
    this.http.put(`http://localhost:5000/api/user/edituser/${this.selectedUser._id}`, payload, { withCredentials: true }).subscribe({
      next: () => {
        alert("User Updated Successfully!");
        this.closeEditModal();
        this.fetchUsers();
      },
      error: (err) => {
        alert(err.error?.message || "Failed to update user.");
      }
    });
  }

  // grab analytics: real user counts + dummy product revenue
  fetchAnalytics() {
    this.http.get("http://localhost:5000/api/analytics/summary", { withCredentials: true }).subscribe({
      next: (res: any) => {
        this.analyticsData = res;
        // set flat props so Angular SSR hydration picks them up correctly
        this.statTotal = res.userStats.total;
        this.statAdmins = res.userStats.admins;
        this.statViewers = res.userStats.viewers;
        this.statSuperAdmins = res.userStats.superAdmins;
        this.statActive = res.userStats.active;
        this.statInactive = res.userStats.inactive;
        this.cdr.detectChanges();
        setTimeout(() => this.renderCharts(), 100);
      }
    });
  }

  // draw two charts — #000a40 as base + some accent colors for variety
  renderCharts() {
    if (!isPlatformBrowser(this.platformId) || !this.analyticsData) return;

    // navy + teal + amber for the 3 product lines
    const lineColors = ["#000a40", "#0ea5e9", "#f59e0b"];
    const lineColorsFill = ["rgba(0,10,64,0.08)", "rgba(14,165,233,0.08)", "rgba(245,158,11,0.08)"];

    // line chart: product revenue per month
    const revenueCanvas = document.getElementById("revenueChart") as HTMLCanvasElement;
    if (revenueCanvas) {
      if (this.revenueChart) this.revenueChart.destroy();
      this.revenueChart = new Chart(revenueCanvas, {
        type: "line",
        data: {
          labels: this.analyticsData.months,
          datasets: this.analyticsData.products.map((p: any, i: number) => ({
            label: p.name,
            data: p.revenue,
            borderColor: lineColors[i],
            backgroundColor: lineColorsFill[i],
            fill: true,
            borderWidth: 2.5,
            pointBackgroundColor: lineColors[i],
            pointRadius: 4,
            tension: 0.4,
          }))
        },
        options: {
          responsive: true,
          plugins: {
            legend: { labels: { color: "#000a40", font: { size: 13 } } }
          },
          scales: {
            x: { ticks: { color: "#000a40" }, grid: { color: "rgba(0,10,64,0.08)" } },
            y: {
              ticks: { color: "#000a40", callback: (v: any) => `₹${(v / 1000).toFixed(0)}k` },
              grid: { color: "rgba(0,10,64,0.08)" }
            },
          }
        }
      });
    }

    // doughnut chart: user role split from real db
    const roleCanvas = document.getElementById("roleChart") as HTMLCanvasElement;
    if (roleCanvas) {
      if (this.roleChart) this.roleChart.destroy();
      const stats = this.analyticsData.userStats;
      this.roleChart = new Chart(roleCanvas, {
        type: "doughnut",
        data: {
          labels: ["Super Admin", "Admin", "Viewer"],
          datasets: [{
            data: [stats.superAdmins, stats.admins, stats.viewers],
            backgroundColor: ["#000a40", "#0ea5e9", "#f59e0b"],
            borderWidth: 3,
            borderColor: "#fff",
          }]
        },
        options: {
          responsive: true,
          cutout: "65%",
          plugins: {
            legend: { labels: { color: "#000a40", font: { size: 13 } } }
          }
        }
      });
    }

  }

  // --- SALES METHODS ---

  fetchSales() {
    this.http.get('http://localhost:5000/api/sales/allsales', { withCredentials: true }).subscribe({
      next: (res: any) => {
        this.salesList = res.allSales;
      },
      error: (err) => console.error(err)
    });
  }

  openAddSaleModal() {
    this.addSaleForm.reset({ quantity: 1, year: 2026 });
    this.isAddSaleModalOpen = true;
  }
  closeAddSaleModal() {
    this.isAddSaleModalOpen = false;
  }

  submitSale() {
    if (this.addSaleForm.invalid) return;
    const saleData = {
      productName: this.addSaleForm.value.productName,
      revenue: this.addSaleForm.value.revenue,
      quantity: this.addSaleForm.value.quantity,
      month: this.addSaleForm.value.month,
      year: this.addSaleForm.value.year
    };
    this.http.post('http://localhost:5000/api/sales/addsales', saleData, { withCredentials: true }).subscribe({
      next: () => {
        alert("Sale Added Successfully");
        this.closeAddSaleModal();
        this.fetchSales();
      },
      error: (err) => alert("Error: " + (err.error?.message || "Could not add sale"))
    });
  }

  openEditSaleModal(sale: any) {
    this.selectedSale = sale;
    this.editSaleForm.patchValue({
      revenue: sale.revenue,
      quantity: sale.quantity
    });
    this.isEditSaleModalOpen = true;
  }
  closeEditSaleModal() {
    this.isEditSaleModalOpen = false;
    this.selectedSale = null;
  }

  submitEditSale() {
    if (this.editSaleForm.invalid) return;
    const updatedData = {
      productName: this.selectedSale.productName,
      month: this.selectedSale.month,
      year: this.selectedSale.year,
      revenue: this.editSaleForm.value.revenue,
      quantity: this.editSaleForm.value.quantity
    };
    this.http.put(`http://localhost:5000/api/sales/editsales/${this.selectedSale._id}`, updatedData, { withCredentials: true }).subscribe({
      next: () => {
        alert("Sale Updated Successfully");
        this.closeEditSaleModal();
        this.fetchSales();
      },
      error: (err) => alert("Error: " + (err.error?.message || "Could not edit sale"))
    });
  }

  deleteSale(id: string) {
    if (confirm("Are you sure you want to delete this sale data?")) {
      this.http.delete(`http://localhost:5000/api/sales/deletesales/${id}`, { withCredentials: true }).subscribe({
        next: () => {
          alert("Sale Deleted Successfully");
          this.fetchSales();
        },
        error: (err) => alert("Error: " + (err.error?.message || "Could not delete sale"))
      });
    }
  }

}