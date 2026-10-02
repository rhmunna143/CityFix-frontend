const fs = require('fs');
const path = require('path');

const dirs = [
  'app/(public)',
  'app/(auth)',
  'app/(citizen)/dashboard',
  'app/(citizen)/dashboard/complaints/new',
  'app/(citizen)/dashboard/complaints/[id]',
  'app/(citizen)/dashboard/payments',
  'app/(citizen)/dashboard/notifications',
  'app/(citizen)/dashboard/profile',
  'app/(staff)/staff',
  'app/(staff)/staff/complaints/[id]',
  'app/(staff)/staff/performance',
  'app/(staff)/staff/profile',
  'app/(admin)/admin',
  'app/(admin)/admin/complaints',
  'app/(admin)/admin/complaints/[id]',
  'app/(admin)/admin/users',
  'app/(admin)/admin/departments',
  'app/(admin)/admin/categories',
  'app/(admin)/admin/audit-logs',
  'app/api/auth/login',
  'app/api/auth/demo',
  'app/api/auth/logout',
  'app/api/auth/register',
  'app/api/auth/forgot-password',
  'app/api/auth/verify-otp',
  'app/api/auth/reset-password',
  'app/api/proxy/[...path]',
  'app/payment/success',
  'app/payment/cancel'
];

dirs.forEach(d => {
  fs.mkdirSync(path.join(__dirname, d), { recursive: true });
});

// Create placeholder page.tsx for UI routes
const pages = [
  'app/(public)/page.tsx',
  'app/(public)/about/page.tsx',
  'app/(public)/services/page.tsx',
  'app/(public)/transparency/page.tsx',
  'app/(public)/contact/page.tsx',
  'app/(auth)/login/page.tsx',
  'app/(auth)/register/page.tsx',
  'app/(auth)/forgot-password/page.tsx',
  'app/(citizen)/dashboard/page.tsx',
  'app/(citizen)/dashboard/complaints/new/page.tsx',
  'app/(citizen)/dashboard/complaints/[id]/page.tsx',
  'app/(citizen)/dashboard/payments/page.tsx',
  'app/(citizen)/dashboard/notifications/page.tsx',
  'app/(citizen)/dashboard/profile/page.tsx',
  'app/(staff)/staff/page.tsx',
  'app/(staff)/staff/complaints/[id]/page.tsx',
  'app/(staff)/staff/performance/page.tsx',
  'app/(staff)/staff/profile/page.tsx',
  'app/(admin)/admin/page.tsx',
  'app/(admin)/admin/complaints/page.tsx',
  'app/(admin)/admin/complaints/[id]/page.tsx',
  'app/(admin)/admin/users/page.tsx',
  'app/(admin)/admin/departments/page.tsx',
  'app/(admin)/admin/categories/page.tsx',
  'app/(admin)/admin/audit-logs/page.tsx',
  'app/payment/success/page.tsx',
  'app/payment/cancel/page.tsx',
];

pages.forEach(p => {
  const fileDir = path.dirname(path.join(__dirname, p));
  fs.mkdirSync(fileDir, { recursive: true });
  // Capitalize component name
  let compName = path.basename(fileDir).replace(/[^a-zA-Z]/g, '') + 'Page';
  if(compName === 'Page') {
     const parts = fileDir.split(path.sep);
     compName = parts[parts.length - 1].replace(/[^a-zA-Z]/g, '') + 'Page';
  }
  fs.writeFileSync(path.join(__dirname, p), `export default function ${compName}() { return <div className="p-8">${p}</div>; }\n`);
});

const handlers = [
  'app/api/auth/login/route.ts',
  'app/api/auth/demo/route.ts',
  'app/api/auth/logout/route.ts',
  'app/api/auth/register/route.ts',
  'app/api/auth/forgot-password/route.ts',
  'app/api/auth/verify-otp/route.ts',
  'app/api/auth/reset-password/route.ts',
  'app/api/proxy/[...path]/route.ts'
];

handlers.forEach(h => {
  const fileDir = path.dirname(path.join(__dirname, h));
  fs.mkdirSync(fileDir, { recursive: true });
  fs.writeFileSync(path.join(__dirname, h), `import { NextResponse } from 'next/server';\n\nexport async function GET() { return NextResponse.json({ message: 'Not Implemented' }); }\nexport async function POST() { return NextResponse.json({ message: 'Not Implemented' }); }\n`);
});

console.log('Scaffold complete');
