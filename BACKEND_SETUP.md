# BreatheSense Backend Setup Guide

## 🚀 **Complete Authentication Backend with MongoDB**

This project now includes a full-featured backend authentication system with role-based access control for patients and administrators.

## 📋 **Features Implemented**

### ✅ **Authentication System**
- User registration (signup) with role assignment
- User login with JWT tokens
- Password hashing with bcrypt
- JWT token generation and verification
- Secure logout functionality

### ✅ **Role-Based Access Control**
- **Patient Role**: Basic user access
- **Admin Role**: Full system access
- Protected routes and API endpoints
- Role-based middleware

### ✅ **User Management**
- Comprehensive user profiles
- Medical history tracking
- Emergency contact information
- Address management
- Profile updates

### ✅ **Admin Features**
- User management dashboard
- User status updates
- Role management
- Search and pagination

## 🛠️ **Installation & Setup**

### 1. **Install Dependencies**
```bash
npm install mongoose bcryptjs jsonwebtoken @types/bcryptjs @types/jsonwebtoken
```

### 2. **Environment Variables**
Create a `.env.local` file in your project root:

```env
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/breathesense

# JWT Secret Key (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random

# Optional: Environment
NODE_ENV=development
```

### 3. **MongoDB Setup**
- Install MongoDB locally or use MongoDB Atlas
- Create a database named `breathesense`
- The system will automatically create collections

## 🏗️ **Project Structure**

```
src/
├── lib/
│   ├── db.ts                    # MongoDB connection
│   ├── auth.ts                  # JWT utilities & middleware
│   ├── models/
│   │   └── User.ts             # User model with schema
│   └── contexts/
│       └── AuthContext.tsx     # React auth context
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/          # Login endpoint
│   │       ├── signup/         # Signup endpoint
│   │       ├── logout/         # Logout endpoint
│   │       └── profile/        # User profile management
│   │   └── admin/
│   │       └── users/          # Admin user management
│   └── components/
│       └── ProtectedRoute.tsx  # Route protection component
```

## 🔐 **API Endpoints**

### **Authentication Endpoints**

#### `POST /api/auth/signup`
- **Purpose**: User registration
- **Body**: 
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "role": "patient",
    "dateOfBirth": "1990-01-01",
    "phoneNumber": "+1234567890",
    "address": {
      "street": "123 Main St",
      "city": "City",
      "state": "State",
      "zipCode": "12345",
      "country": "Country"
    }
  }
  ```

#### `POST /api/auth/login`
- **Purpose**: User authentication
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

#### `GET /api/auth/profile`
- **Purpose**: Get user profile
- **Headers**: `Authorization: Bearer <token>`

#### `PUT /api/auth/profile`
- **Purpose**: Update user profile
- **Headers**: `Authorization: Bearer <token>`

#### `POST /api/auth/logout`
- **Purpose**: User logout (client-side token removal)

### **Admin Endpoints**

#### `GET /api/admin/users`
- **Purpose**: List all users (admin only)
- **Headers**: `Authorization: Bearer <admin_token>`
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `role`: Filter by role
  - `search`: Search by name/email

#### `PUT /api/admin/users`
- **Purpose**: Update user (admin only)
- **Headers**: `Authorization: Bearer <admin_token>`
- **Body**:
  ```json
  {
    "userId": "user_id_here",
    "action": "updateStatus",
    "data": { "isActive": false }
  }
  ```

## 🎯 **Usage Examples**

### **Frontend Authentication**

```tsx
import { useAuth } from '@/lib/contexts/AuthContext';

function LoginForm() {
  const { login } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      // Redirect to dashboard
    }
  };
}
```

### **Protected Routes**

```tsx
import { AdminRoute, PatientRoute, AuthRoute } from '@/components/ProtectedRoute';

// Admin only
<AdminRoute>
  <AdminDashboard />
</AdminRoute>

// Patient only
<PatientRoute>
  <PatientDashboard />
</PatientRoute>

// Any authenticated user
<AuthRoute>
  <UserProfile />
</AuthRoute>
```

### **API Calls with Authentication**

```tsx
const response = await fetch('/api/auth/profile', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
```

## 🔒 **Security Features**

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Role Validation**: Server-side role checking
- **Input Validation**: Comprehensive data validation
- **Error Handling**: Secure error responses
- **Token Expiration**: 7-day token validity

## 🧪 **Testing the Backend**

### **1. Test Signup**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User",
    "role": "patient"
  }'
```

### **2. Test Login**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### **3. Test Protected Route**
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🚨 **Important Notes**

1. **JWT Secret**: Generate a strong, random JWT secret
2. **MongoDB**: Ensure MongoDB is running and accessible
3. **Environment Variables**: Never commit `.env.local` to version control
4. **Token Storage**: Store JWT tokens securely (localStorage for demo, httpOnly cookies for production)
5. **Password Requirements**: Minimum 8 characters
6. **Role Assignment**: Default role is 'patient' for security

## 🔧 **Troubleshooting**

### **Common Issues**

1. **MongoDB Connection Error**
   - Check if MongoDB is running
   - Verify connection string in `.env.local`

2. **JWT Errors**
   - Ensure JWT_SECRET is set
   - Check token expiration

3. **Authentication Failures**
   - Verify email/password
   - Check if user account is active

4. **Role Access Denied**
   - Ensure user has correct role
   - Check middleware configuration

## 🚀 **Next Steps**

1. **Frontend Integration**: Update login/signup forms
2. **Dashboard Pages**: Create patient and admin dashboards
3. **Profile Management**: Build user profile editing interface
4. **Admin Panel**: Develop comprehensive admin interface
5. **Additional Features**: Add password reset, email verification

---

**🎉 Your backend is now ready!** The system provides a solid foundation for a healthcare application with proper authentication, authorization, and user management.
