import { query } from '../db/index.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const findPhotos = async (projectId, date) => {
  let sql = 'SELECT * FROM progress_photos';
  const params = [];
  if (projectId) {
    params.push(projectId);
    sql += ' WHERE project_id = $1';
    if (date) {
      params.push(date);
      sql += ' AND photo_date = $2';
    }
  } else if (date) {
    params.push(date);
    sql += ' WHERE photo_date = $1';
  }
  sql += ' ORDER BY created_at DESC';
  const result = await query(sql, params);
  return result.rows;
};

export const uploadProjectPhoto = async (file, meta) => {
  if (!file) {
    throw new Error('Photo file is required');
  }
  const uploadResult = await cloudinary.uploader.upload(file.path, {
    folder: 'construction_portal',
  });
  const result = await query(
    `INSERT INTO progress_photos (project_id, task_id, report_id, image_url, caption, location, photo_date, uploaded_by)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [
      meta.project_id,
      meta.task_id,
      meta.report_id,
      uploadResult.secure_url,
      meta.caption,
      meta.location,
      meta.photo_date,
      meta.uploaded_by,
    ]
  );
  return result.rows[0];
};
