import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 파일명 중복 방지를 위해 timestamp
  const fileName = `${Date.now()}-${file.name}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', fileName);

  await fs.promises.writeFile(uploadDir, buffer);

  return NextResponse.json({
    url: `/uploads/${fileName}`,
  });
}
