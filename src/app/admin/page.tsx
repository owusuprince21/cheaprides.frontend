'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, fetchAndUpdateUser } from '../../lib/auth';
import api from '../../lib/api';
import { AdminStats, AdminUser } from '../../types/car';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { useToast } from  "@/hooks/use-toast";
import { 
  Car as CarIcon, 
  Users, 
  Plus, 
  Shield, 
  Activity,
  TrendingUp} from 'lucide-react';

const CAR_BRANDS = [
  { value: 'audi', label: 'AUDI' },
  { value: 'bently', label: 'BENTLY' },
  { value: 'bmw', label: 'BMW' },
  { value: 'ford', label: 'FORD' },
  { value: 'gmc', label: 'GMC' },
  { value: 'honda', label: 'HONDA' },
  { value: 'hyundai', label: 'HYUNDAI' },
  { value: 'jaguar', label: 'JAGUAR' },
  { value: 'jeep', label: 'JEEP' },
  { value: 'kia', label: 'KIA' },
  { value: 'land rover', label: 'LAND ROVER' },
  { value: 'lexus', label: 'LEXUS' },
  { value: 'mazda', label: 'MAZDA' },
  { value: 'mercedes', label: 'MERCEDES' },
  { value: 'mitsubishi', label: 'MITSUBISHI' },
  { value: 'nissan', label: 'NISSAN' },
  { value: 'porsche', label: 'PORSCHE' },
  { value: 'toyota', label: 'TOYOTA' },
];

const FUEL_TYPES = [
  { value: 'petrol', label: 'Petrol' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'electric', label: 'Electric' },
];

const TRANSMISSION_TYPES = [
  { value: 'manual', label: 'Manual' },
  { value: 'automatic', label: 'Automatic' },
];

const CONDITION_TYPES = [
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' },
  { value: 'certified', label: 'Certified Pre-owned' },
];
// Generate years from current year down to 2015
const YEARS = Array.from({ length: new Date().getFullYear() - 2015 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: year.toString(), label: year.toString() };
});

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
const { toast } = useToast();

  // Car form state
  const [carForm, setCarForm] = useState({
    title: '',
    description: '',
    price: '',
    make: '',
    model: '',
    year: '',
    mileage: '',
    fuel_type: 'petrol',
    transmission: 'manual',
    condition: 'used',
    color: '',
    engine_size: '',
    doors: '4',
    seats: '5',
    features: '',
    is_featured: false,
    is_available: true
  });
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<FileList | null>(null);



  useEffect(() => {
    const checkAdminAccess = async () => {
      console.log('🚀 Starting admin access check...');
      
      const authStatus = isAuthenticated();
      const currentUser = await fetchAndUpdateUser();
      const adminStatus = currentUser.is_staff || currentUser.is_superuser;
    
    if (!authStatus || !adminStatus) {
    router.replace('/');
    return null; // Stop rendering
  }
      
      console.log('🔍 Authentication status:', authStatus);
      console.log('🔍 Current user:', currentUser);
      console.log('🔍 Is admin:', adminStatus);
      
      if (!authStatus) {
        console.log('❌ Not authenticated, redirecting to login');
        toast({
          title: "Authentication Required",
          description: "Please log in to access the admin dashboard.",
          variant: "destructive",
        });
    router.replace('/'); // Redirect to home
    return;
      }

      if (!adminStatus) {
        console.log('❌ Not admin, access denied');
        console.log('❌ User details:', {
          username: currentUser?.username,
          is_staff: currentUser?.is_staff,
          is_superuser: currentUser?.is_superuser
        });
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges to access this page.",
          variant: "destructive",
        });
    router.replace('/'); // Redirect to home
    return;
      }

      console.log('✅ Admin access granted, fetching data...');
      
      try {
        console.log('🔍 Making API requests...');
        // Fetch admin data
        const [statsResponse, usersResponse] = await Promise.all([
          api.get('/admin/stats/'),
          api.get('/admin/users/')
        ]);
        
        console.log('✅ Admin data fetched successfully');
        setStats(statsResponse.data);
        setUsers(usersResponse.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error('❌ Admin data fetch error:', error);
        console.error('❌ Error response:', error.response);
         console.error(error);
      router.replace('/');
        
        if (error.response?.status === 403) {
          toast({
            title: "Access Denied",
            description: "You don't have admin privileges to access this page.",
            variant: "destructive",
          });
          router.push('/');
        } else if (error.response?.status === 401) {
          toast({
            title: "Authentication Failed",
            description: "Please log in again to access the admin dashboard.",
            variant: "destructive",
          });
          router.push('/auth/login');
        } else {
          toast({
            title: "Error",
            description: "Failed to load admin data.",
            variant: "destructive",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, [router, toast]);

  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingCar(true);

    try {
      const formData = new FormData();
      Object.entries(carForm).forEach(([key, value]) => {
        if (key === 'is_featured' || key === 'is_available') {
          formData.append(key, value.toString());
        } else {
          formData.append(key, value as string);
        }
      });

      // Add main image
      if (mainImage) {
        formData.append('main_image', mainImage);
      }

      // Add gallery images
      if (galleryImages) {
        for (let i = 0; i < galleryImages.length; i++) {
          formData.append('gallery_images', galleryImages[i]);
        }
      }

      await api.post('/admin/add-car/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast({
        title: "Success",
        description: "Car added successfully!",
      });

      // Reset form
      setCarForm({
        title: '',
        description: '',
        price: '',
        make: '',
        model: '',
        year: '',
        mileage: '',
        fuel_type: 'petrol',
        transmission: 'manual',
        condition: 'used',
        color: '',
        engine_size: '',
        doors: '4',
        seats: '5',
        features: '',
        is_featured: false,
        is_available: true
      });
      setMainImage(null);
      setGalleryImages(null);

      setIsDialogOpen(false);

      // Refresh stats
      const statsResponse = await api.get('/admin/stats/');
      setStats(statsResponse.data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
 
    } finally {
      setIsAddingCar(false);
    }
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImage(file);
    }
  };

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setGalleryImages(files);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don&apos;t have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your car inventory and users</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cars">Cars</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
                  <CarIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.car_overview.total}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.car_overview.available} available
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Featured Cars</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.car_overview.featured}</div>
                  <p className="text-xs text-muted-foreground">
                    Hot sales cars
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.user_stats.total}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.user_stats.active} active
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.user_stats.admins}</div>
                  <p className="text-xs text-muted-foreground">
                    Staff members
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Car Brands Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Cars by Brand</CardTitle>
                <CardDescription>Distribution of cars across different brands</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.car_stats.map((brand) => (
                    <div key={brand.make} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-600 rounded"></div>
                        <span className="font-medium capitalize">{brand.make}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ 
                              width: `${(brand.count / stats.car_overview.total) * 100}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">{brand.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cars" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Car Management</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Car
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Car</DialogTitle>
                    <DialogDescription>
                      Fill in the details to add a new car to the inventory.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddCar} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={carForm.title}
                          onChange={(e) => setCarForm({...carForm, title: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="price">Price (GHS)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={carForm.price}
                          onChange={(e) => setCarForm({...carForm, price: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={carForm.description}
                        onChange={(e) => setCarForm({...carForm, description: e.target.value})}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="main_image">Main Image *</Label>
                        <Input
                          id="main_image"
                          type="file"
                          accept="image/*"
                          onChange={handleMainImageChange}
                          required
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {mainImage && (
                          <p className="text-sm text-gray-600 mt-1">
                            Selected: {mainImage.name}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="gallery_images">Image Gallery (Optional)</Label>
                        <Input
                          id="gallery_images"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleGalleryImagesChange}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                        />
                        {galleryImages && galleryImages.length > 0 && (
                          <p className="text-sm text-gray-600 mt-1">
                            Selected: {galleryImages.length} image(s)
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="make">Brand</Label>
                        <Select value={carForm.make} onValueChange={(value) => setCarForm({...carForm, make: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select brand" />
                          </SelectTrigger>
                          <SelectContent>
                            {CAR_BRANDS.map((brand) => (
                              <SelectItem key={brand.value} value={brand.value}>
                                {brand.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="model">Model</Label>
                        <Input
                          id="model"
                          value={carForm.model}
                          onChange={(e) => setCarForm({...carForm, model: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="year">Year</Label>
                        <Select value={carForm.year} onValueChange={(value) => setCarForm({...carForm, year: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent className="max-h-60">
                            {YEARS.map((year) => (
                              <SelectItem key={year.value} value={year.value}>
                                {year.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="mileage">Mileage (km)</Label>
                        <Input
                          id="mileage"
                          type="number"
                          value={carForm.mileage}
                          onChange={(e) => setCarForm({...carForm, mileage: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="color">Color</Label>
                        <Input
                          id="color"
                          value={carForm.color}
                          onChange={(e) => setCarForm({...carForm, color: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fuel_type">Fuel Type</Label>
                        <Select value={carForm.fuel_type} onValueChange={(value) => setCarForm({...carForm, fuel_type: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select fuel type" />
                          </SelectTrigger>
                          <SelectContent>
                            {FUEL_TYPES.map((fuel) => (
                              <SelectItem key={fuel.value} value={fuel.value}>
                                {fuel.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="transmission">Transmission</Label>
                        <Select value={carForm.transmission} onValueChange={(value) => setCarForm({...carForm, transmission: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select transmission" />
                          </SelectTrigger>
                          <SelectContent>
                            {TRANSMISSION_TYPES.map((transmission) => (
                              <SelectItem key={transmission.value} value={transmission.value}>
                                {transmission.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="condition">Condition</Label>
                        <Select value={carForm.condition} onValueChange={(value) => setCarForm({...carForm, condition: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            {CONDITION_TYPES.map((condition) => (
                              <SelectItem key={condition.value} value={condition.value}>
                                {condition.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="doors">Doors</Label>
                        <Input
                          id="doors"
                          type="number"
                          value={carForm.doors}
                          onChange={(e) => setCarForm({...carForm, doors: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="seats">Seats</Label>
                        <Input
                          id="seats"
                          type="number"
                          value={carForm.seats}
                          onChange={(e) => setCarForm({...carForm, seats: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="features">Features (comma-separated)</Label>
                      <Textarea
                        id="features"
                        value={carForm.features}
                        onChange={(e) => setCarForm({...carForm, features: e.target.value})}
                        placeholder="Air Conditioning, Power Steering, ABS, etc."
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="is_featured"
                          checked={carForm.is_featured}
                          onChange={(e) => setCarForm({...carForm, is_featured: e.target.checked})}
                        />
                        <Label htmlFor="is_featured">Featured (Hot Sale)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="is_available"
                          checked={carForm.is_available}
                          onChange={(e) => setCarForm({...carForm, is_available: e.target.checked})}
                        />
                        <Label htmlFor="is_available">Available</Label>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button type="submit" disabled={isAddingCar}>
                        {isAddingCar ? 'Adding...' : 'Add Car'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Car Inventory Overview</CardTitle>
                <CardDescription>Quick stats about your car inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.car_overview.total}</div>
                    <div className="text-sm text-gray-600">Total Cars</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.car_overview.available}</div>
                    <div className="text-sm text-gray-600">Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{stats.car_overview.featured}</div>
                    <div className="text-sm text-gray-600">Featured</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage registered users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Last Login</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.is_active ? "default" : "secondary"}>
                            {user.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.is_staff ? "destructive" : "outline"}>
                            {user.is_staff ? "Admin" : "User"}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(user.date_joined)}</TableCell>
                        <TableCell>{formatDate(user.last_login)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Brand Distribution</CardTitle>
                  <CardDescription>Cars by brand in your inventory</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.car_stats.slice(0, 8).map((brand, index) => (
                      <div key={brand.make} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-4 h-4 rounded"
                            style={{ 
                              backgroundColor: `hsl(${(index * 45) % 360}, 70%, 50%)` 
                            }}
                          ></div>
                          <span className="font-medium capitalize">{brand.make}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${(brand.count / stats.car_overview.total) * 100}%`,
                                backgroundColor: `hsl(${(index * 45) % 360}, 70%, 50%)`
                              }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-8">{brand.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Statistics</CardTitle>
                  <CardDescription>Overview of user activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <span>Total Users</span>
                      </div>
                      <span className="text-2xl font-bold">{stats.user_stats.total}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Activity className="h-5 w-5 text-green-600" />
                        <span>Active Users</span>
                      </div>
                      <span className="text-2xl font-bold">{stats.user_stats.active}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-red-600" />
                        <span>Admin Users</span>
                      </div>
                      <span className="text-2xl font-bold">{stats.user_stats.admins}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// function fetchAndUpdateUser() {
//     throw new Error('Function not implemented.');
// }
