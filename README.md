# 🫁 BreatheSense

**AI + IoT Powered Early Detection & Monitoring of COPD, Asthma & Emphysema**

BreatheSense is a comprehensive healthcare platform that combines cutting-edge IoT technology with artificial intelligence to provide real-time respiratory monitoring and early detection of respiratory conditions. The platform empowers patients and healthcare providers with actionable insights for better health outcomes.

## 🚀 **Live Demo**

- **Frontend**: [https://breathesense.vercel.app](https://breathesense.vercel.app)
- **Backend API**: RESTful API with MongoDB integration
- **Documentation**: Comprehensive API docs and setup guides

## 🎯 **Project Overview**

BreatheSense addresses the critical need for early detection of respiratory conditions affecting over 300 million people worldwide. By combining IoT sensors, AI-powered analytics, and a user-friendly platform, we provide:

- **Real-time respiratory monitoring** from home
- **AI-powered pattern recognition** for early warning signs
- **Personalized health insights** and recommendations
- **Comprehensive patient management** for healthcare providers
- **Scalable IoT infrastructure** for widespread adoption

## 🛠️ **Tech Stack**

### **Frontend Technologies**
- **Framework**: Next.js 15.5.0 (React 19.1.0)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x with custom CSS variables
- **UI Components**: Custom component library with Framer Motion
- **Icons**: Tabler Icons React
- **3D Graphics**: Three.js with React Three Fiber
- **Animations**: Framer Motion, Lottie React
- **Charts**: Recharts for data visualization

### **Backend Technologies**
- **Runtime**: Node.js with Next.js API routes
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcryptjs
- **API**: RESTful API architecture
- **Validation**: Comprehensive input validation and sanitization

### **Development Tools**
- **Package Manager**: npm
- **Linting**: ESLint with Next.js configuration
- **Build Tool**: Next.js with Turbopack
- **Type Checking**: TypeScript strict mode
- **Code Formatting**: Prettier (recommended)

### **Deployment & Infrastructure**
- **Platform**: Vercel (recommended)
- **Database**: MongoDB Atlas or local MongoDB
- **Environment**: Support for development, staging, and production
- **CI/CD**: Git-based deployment with Vercel

## 🏗️ **Project Architecture**

### **Directory Structure**
```
breathesense/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API endpoints
│   │   │   ├── admin/         # Admin-only endpoints
│   │   │   └── auth/          # Authentication endpoints
│   │   ├── components/        # Page-specific components
│   │   ├── dashboard/         # Dashboard pages
│   │   │   ├── admin/         # Admin dashboard
│   │   │   └── patient/       # Patient dashboard
│   │   ├── login/             # Login page
│   │   ├── signup/            # Signup page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Shared components
│   ├── lib/                   # Core utilities
│   │   ├── contexts/          # React contexts
│   │   ├── models/            # Database models
│   │   └── utils.ts           # Utility functions
│   └── data/                  # Static data files
├── public/                    # Static assets
├── package.json               # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── next.config.ts            # Next.js configuration
└── README.md                 # This file
```

### **Core Components**
- **Authentication System**: JWT-based auth with role management
- **Dashboard Framework**: Role-based dashboards with sidebar navigation
- **API Layer**: RESTful endpoints with middleware protection
- **Database Models**: Mongoose schemas with validation
- **UI Components**: Reusable components with Tailwind CSS

## 🔐 **Authentication & Authorization**

### **User Roles**
1. **Patient Role** (`patient`)
   - Access to personal health dashboard
   - View and manage health data
   - Schedule appointments
   - Manage connected devices
   - Update personal profile

2. **Admin Role** (`admin`)
   - Full system access
   - User management
   - Analytics and reporting
   - Device management
   - System monitoring

### **Security Features**
- **Password Hashing**: bcrypt with 12 salt rounds
- **JWT Tokens**: 7-day validity with secure storage
- **Role Validation**: Server-side role checking
- **Input Validation**: Comprehensive data sanitization
- **Protected Routes**: Client and server-side protection

## 📊 **Dashboard System**

### **Patient Dashboard** (`/dashboard/patient`)
- **Health Data Overview**: Respiratory recordings and trends
- **Device Management**: Connected IoT devices and status
- **Appointment Scheduling**: Healthcare provider visits
- **Profile Management**: Personal and medical information
- **Quick Actions**: Record breathing, book appointments

### **Admin Dashboard** (`/dashboard/admin`)
- **User Management**: Patient and admin accounts
- **Analytics**: Respiratory data insights and trends
- **Device Monitoring**: IoT device status and maintenance
- **System Health**: Server status and performance metrics
- **Alert Management**: Critical notifications and warnings

### **Dashboard Features**
- **Responsive Design**: Mobile-first approach
- **Real-time Updates**: Live data streaming
- **Interactive Charts**: Data visualization with Recharts
- **Role-based Navigation**: Dynamic sidebar based on user role
- **Search & Filtering**: Advanced data querying

## 🔌 **API Endpoints**

### **Authentication Endpoints**
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - User logout

### **Admin Endpoints**
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users` - Update user information
- `GET /api/admin/analytics` - System analytics
- `GET /api/admin/devices` - Device management
- `GET /api/admin/alerts` - System alerts

### **Data Models**
- **User Model**: Comprehensive user profiles with medical history
- **Health Data**: Respiratory recordings and analysis
- **Device Data**: IoT sensor information and status
- **Appointment Data**: Healthcare scheduling information

## 🏥 **Healthcare Features**

### **Respiratory Monitoring**
- **Real-time Data Collection**: Continuous IoT sensor monitoring
- **AI Pattern Recognition**: Machine learning for early detection
- **Predictive Analytics**: Risk assessment and alerts
- **Data Visualization**: Interactive charts and trends

### **Patient Management**
- **Medical History**: Comprehensive health records
- **Emergency Contacts**: Critical contact information
- **Medication Tracking**: Current and historical medications
- **Allergy Management**: Known allergies and reactions

### **Healthcare Provider Integration**
- **Appointment Scheduling**: Integrated calendar system
- **Data Sharing**: Secure health data transmission
- **Communication**: Provider-patient messaging
- **Reporting**: Comprehensive health reports

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- MongoDB 6+ (local or Atlas)
- npm or yarn package manager

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/breathesense.git
   cd breathesense
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file:
   ```env
   MONGO_URI=mongodb://localhost:27017/breathesense
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=development
   ```

4. **Database Setup**
   - Install MongoDB locally or use MongoDB Atlas
   - Create database named `breathesense`
   - Collections will be created automatically

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### **Available Scripts**
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 **Configuration**

### **Next.js Configuration**
- **Turbopack**: Enabled for faster development builds
- **Image Optimization**: Remote image patterns configured
- **TypeScript**: Strict mode with path aliases
- **Environment Variables**: Support for multiple environments

### **Tailwind CSS**
- **Custom Color Scheme**: Healthcare-focused color palette
- **Responsive Design**: Mobile-first approach
- **Component Library**: Pre-built UI components
- **Dark Mode**: Configurable theme support

### **Database Configuration**
- **MongoDB Connection**: Configurable connection strings
- **Schema Validation**: Comprehensive data validation
- **Indexing**: Performance optimization
- **Error Handling**: Graceful error management

## 📱 **User Experience**

### **Design Principles**
- **Accessibility**: WCAG 2.1 AA compliance
- **Responsiveness**: Mobile-first design approach
- **Performance**: Optimized loading and rendering
- **Usability**: Intuitive navigation and interactions

### **Key Features**
- **Interactive Animations**: Smooth transitions and micro-interactions
- **Real-time Updates**: Live data streaming and notifications
- **Progressive Enhancement**: Core functionality without JavaScript
- **Cross-browser Compatibility**: Modern browser support

## 🔒 **Security & Privacy**

### **Data Protection**
- **Encryption**: Data encryption in transit and at rest
- **Access Control**: Role-based permissions
- **Audit Logging**: Comprehensive activity tracking
- **Compliance**: HIPAA-ready security measures

### **Privacy Features**
- **User Consent**: Explicit permission management
- **Data Minimization**: Collect only necessary information
- **Right to Deletion**: User data removal capabilities
- **Transparency**: Clear data usage policies

## 🧪 **Testing & Quality**

### **Code Quality**
- **TypeScript**: Static type checking
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting consistency
- **Git Hooks**: Pre-commit quality checks

### **Testing Strategy**
- **Unit Testing**: Component and utility testing
- **Integration Testing**: API endpoint testing
- **E2E Testing**: User workflow testing
- **Performance Testing**: Load and stress testing

## 📈 **Performance & Scalability**

### **Optimization Features**
- **Code Splitting**: Dynamic imports for better loading
- **Image Optimization**: Next.js image optimization
- **Caching**: Strategic caching strategies
- **CDN Integration**: Global content delivery

### **Scalability Considerations**
- **Microservices Ready**: Modular architecture
- **Database Scaling**: MongoDB sharding support
- **Load Balancing**: Horizontal scaling support
- **Monitoring**: Performance metrics and alerts

## 🚀 **Deployment**

### **Vercel Deployment** (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch
4. Custom domain configuration available

### **Other Platforms**
- **Netlify**: Static site deployment
- **AWS**: Full-stack deployment
- **Docker**: Containerized deployment
- **Self-hosted**: Custom server setup

### **Environment Variables**
```env
# Production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/breathesense
JWT_SECRET=production-secret-key
NODE_ENV=production

# Staging
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/breathesense-staging
JWT_SECRET=staging-secret-key
NODE_ENV=staging
```

## 🤝 **Contributing**

### **Development Workflow**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### **Code Standards**
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain component reusability
- Write comprehensive documentation

### **Commit Guidelines**
- Use conventional commit format
- Include descriptive commit messages
- Reference issues when applicable
- Keep commits focused and atomic

## 📚 **Documentation**

### **Additional Resources**
- [BACKEND_SETUP.md](./BACKEND_SETUP.md) - Detailed backend setup guide
- [API Documentation](./docs/api.md) - Complete API reference
- [Component Library](./docs/components.md) - UI component documentation
- [Deployment Guide](./docs/deployment.md) - Deployment instructions

### **Architecture Decisions**
- [Why Next.js?](./docs/architecture/nextjs.md)
- [Database Design](./docs/architecture/database.md)
- [Authentication Strategy](./docs/architecture/auth.md)
- [IoT Integration](./docs/architecture/iot.md)

## 🆘 **Support & Troubleshooting**

### **Common Issues**
1. **MongoDB Connection**: Check connection string and network access
2. **JWT Errors**: Verify JWT_SECRET environment variable
3. **Build Failures**: Clear .next folder and reinstall dependencies
4. **Authentication Issues**: Check token expiration and storage

### **Getting Help**
- **GitHub Issues**: Report bugs and request features
- **Discussions**: Community support and questions
- **Documentation**: Comprehensive guides and examples
- **Email Support**: Direct support for critical issues

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Next.js Team**: For the amazing React framework
- **Tailwind CSS**: For the utility-first CSS framework
- **MongoDB**: For the flexible NoSQL database
- **Healthcare Community**: For domain expertise and feedback

## 📞 **Contact**

- **Project Lead**: [Your Name](mailto:your.email@example.com)
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **LinkedIn**: [Your Profile](https://linkedin.com/in/yourprofile)
- **Website**: [https://breathesense.com](https://breathesense.com)

---

**🎉 Thank you for choosing BreatheSense!** 

Together, we're building a healthier future through technology and innovation. Every breath matters, and we're here to help you breathe easier.
