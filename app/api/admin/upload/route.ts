import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'
import { isAdminRequest } from '@/lib/admin-auth'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ error: 'Image upload is not configured.' }, { status: 503 })
  }

  let requestData: FormData
  try {
    requestData = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid upload request.' }, { status: 400 })
  }
  const file = requestData.get('file')
  if (!(file instanceof File) || !file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Please select a valid image file.' }, { status: 400 })
  }
  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'Images must be smaller than 10 MB.' }, { status: 400 })
  }

  const timestamp = Math.floor(Date.now() / 1000).toString()
  const folder = 'mjk-website'
  const signature = createHash('sha1')
    .update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`)
    .digest('hex')

  const formData = new FormData()
  formData.append('file', file)
  formData.append('api_key', apiKey)
  formData.append('folder', folder)
  formData.append('timestamp', timestamp)
  formData.append('signature', signature)

  const upload = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  })
  const payload = await upload.json()
  if (!upload.ok || !payload.secure_url) {
    return NextResponse.json({ error: payload.error?.message || 'Image upload failed.' }, { status: 502 })
  }

  return NextResponse.json({ url: payload.secure_url })
}
