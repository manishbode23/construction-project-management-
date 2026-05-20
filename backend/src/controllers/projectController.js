import {
  findProjects,
  findProjectById,
  createProjectRecord,
  updateProjectRecord,
  archiveProjectRecord,
} from '../services/projectService.js';

export const listProjects = async (req, res, next) => {
  try {
    const projects = await findProjects();
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const project = await findProjectById(req.params.id);
    res.json(project);
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const project = await createProjectRecord(req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await updateProjectRecord(req.params.id, req.body);
    res.json(project);
  } catch (error) {
    next(error);
  }
};

export const archiveProject = async (req, res, next) => {
  try {
    await archiveProjectRecord(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
