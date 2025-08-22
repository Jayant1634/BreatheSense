// Simple test script for BreatheSense backend
// Run with: node test-backend.js

const BASE_URL = 'http://localhost:3000/api';

async function testBackend() {
  console.log('🧪 Testing BreatheSense Backend...\n');

  // Test 1: Signup
  console.log('1️⃣ Testing User Signup...');
  try {
    const signupResponse = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        role: 'patient'
      }),
    });

    const signupData = await signupResponse.json();
    
    if (signupResponse.ok) {
      console.log('✅ Signup successful!');
      console.log('   User ID:', signupData.user._id);
      console.log('   Token:', signupData.token.substring(0, 20) + '...');
    } else {
      console.log('❌ Signup failed:', signupData.error);
    }
  } catch (error) {
    console.log('❌ Signup error:', error.message);
  }

  console.log('\n2️⃣ Testing User Login...');
  try {
    const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      }),
    });

    const loginData = await loginResponse.json();
    
    if (loginResponse.ok) {
      console.log('✅ Login successful!');
      console.log('   User:', loginData.user.firstName, loginData.user.lastName);
      console.log('   Role:', loginData.user.role);
      console.log('   Token:', loginData.token.substring(0, 20) + '...');
      
      // Test 3: Protected Route
      console.log('\n3️⃣ Testing Protected Route...');
      try {
        const profileResponse = await fetch(`${BASE_URL}/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${loginData.token}`,
            'Content-Type': 'application/json',
          },
        });

        const profileData = await profileResponse.json();
        
        if (profileResponse.ok) {
          console.log('✅ Protected route accessible!');
          console.log('   Email:', profileData.user.email);
          console.log('   Created:', new Date(profileData.user.createdAt).toLocaleDateString());
        } else {
          console.log('❌ Protected route failed:', profileData.error);
        }
      } catch (error) {
        console.log('❌ Protected route error:', error.message);
      }

    } else {
      console.log('❌ Login failed:', loginData.error);
    }
  } catch (error) {
    console.log('❌ Login error:', error.message);
  }

  console.log('\n4️⃣ Testing Admin User Creation...');
  try {
    const adminSignupResponse = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@breathesense.com',
        password: 'admin123456',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin'
      }),
    });

    const adminSignupData = await adminSignupResponse.json();
    
    if (adminSignupResponse.ok) {
      console.log('✅ Admin signup successful!');
      console.log('   Admin ID:', adminSignupData.user._id);
      console.log('   Role:', adminSignupData.user.role);
      
      // Test 5: Admin Endpoint
      console.log('\n5️⃣ Testing Admin Endpoint...');
      try {
        const adminResponse = await fetch(`${BASE_URL}/admin/users?limit=5`, {
          headers: {
            'Authorization': `Bearer ${adminSignupData.token}`,
            'Content-Type': 'application/json',
          },
        });

        const adminData = await adminResponse.json();
        
        if (adminResponse.ok) {
          console.log('✅ Admin endpoint accessible!');
          console.log('   Total users:', adminData.pagination.total);
          console.log('   Users found:', adminData.users.length);
        } else {
          console.log('❌ Admin endpoint failed:', adminData.error);
        }
      } catch (error) {
        console.log('❌ Admin endpoint error:', error.message);
      }

    } else {
      console.log('❌ Admin signup failed:', adminSignupData.error);
    }
  } catch (error) {
    console.log('❌ Admin signup error:', error.message);
  }

  console.log('\n🎉 Backend testing completed!');
  console.log('\n📝 Next steps:');
  console.log('   1. Create .env.local with MONGO_URI and JWT_SECRET');
  console.log('   2. Ensure MongoDB is running');
  console.log('   3. Start your Next.js development server');
  console.log('   4. Test the frontend integration');
}

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
  testBackend().catch(console.error);
}

module.exports = { testBackend };
