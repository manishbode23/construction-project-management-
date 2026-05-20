import { uploadProjectPhoto, findPhotos } from '../services/photoService.js';

export const listPhotos = async (req, res, next) => {
  try {
    const photos = await findPhotos(req.query.projectId, req.query.date);
    res.json(photos);
  } catch (error) {
    next(error);
  }
};

export const uploadPhoto = async (req, res, next) => {
  try {
    const photo = await uploadProjectPhoto(req.file, req.body);
    res.status(201).json(photo);
  } catch (error) {
    next(error);
  }
};
