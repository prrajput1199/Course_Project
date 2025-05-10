<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body>

  <h1>📚 Course Application</h1>

  <div class="section">
    <h2>📌 Description</h2>
    <p>This app allows users to create, browse, and enroll in online courses. Admins can manage the course content while users can access enrolled materials after logging in.</p>
  </div>

  <div class="section">
    <h2>🚀 Tech Stack</h2>
    <ul>
      <li><strong>Backend</strong>: Node.js, Express.js</li>
      <li><strong>Database</strong>: MongoDB</li>
      <li><strong>Authentication</strong>: JWT</li>
    </ul>
  </div>

  <div class="section">
    <h2>✅ Features</h2>
    <ul>
      <li>User signup & login</li>
      <li>Create & manage courses (admin only)</li>
      <li>Enroll in courses</li>
      <li>View enrolled course content</li>
    </ul>
  </div>

  <div class="section">
    <h2>⚙️ How to Run Locally</h2>
    <ol>
      <li>Clone the repo:
        <pre><code>git clone https://github.com/your-username/course-app.git</code></pre>
      </li>
      <li>Install backend dependencies:
        <pre><code>cd server
npm install</code></pre>
      </li>
      <li>Create a <code>.env</code> file in <code>/server</code>:
        <pre><code>MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret</code></pre>
      </li>
      <li>Start backend:
        <pre><code>npm start</code></pre>
      </li>
      <li>Setup frontend:
        <pre><code>cd ../client
npm install
npm start</code></pre>
      </li>
    </ol>
  </div>

  <div class="section">
    <h2>API Endpoints</h2>
    <ul>
      <li><code>POST /api/v1/user/signup</code> -user Register</li>
      <li><code>POST /api/v1/user/signin</code> -user Login</li>
      <li><code>POST /api/v1/admin/signup</code> -Admin Register</li>
      <li><code>POST /api/v1/admin/signin</code> -Admin Login</li>
      <li><code>POST /api/v1/admin/course</code> - Add course (admin)</li>
      <li><code>PUT /api/v1/admin/course</code> - Update Courese</li>
      <li><code>get /api/v1/admin/course/preview</code> - Get all Courese</li>
      <li><code>POST /api/v1/course/purchase</code> - Enroll in a course</li>
      <li><code>GET /api/v1/user/purchased</code> - Get user enrolled courses</li>
    </ul>
  </div>

  <div class="section">
    <h2>👤 Author</h2>
    <p>Built by <strong>Pratik</strong> • <a href="https://github.com/prrajput1199">GitHub</a></p>
  </div>

</body>
</html>
