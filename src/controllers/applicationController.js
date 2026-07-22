const prisma = require("../config/prisma");

// GET /applications
exports.getApplications = async (req, res) => {
  try {
    const applications = await prisma.application.findMany();

    return res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve applications",
      error: error.message,
    });
  }
};

// GET /applications/:id
exports.getApplication = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const application = await prisma.application.findUnique({
      where: { id },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve application",
      error: error.message,
    });
  }
};

// POST /applications
exports.createApplication = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const {
      company,
      position,
      location,
      jobType,
      salary,
      status,
      applicationUrl,
      contactName,
      contactEmail,
      notes,
      dateApplied,
    } = req.body;

    console.log({
      company,
      position,
      jobType,
      dateApplied,
    });
    // console.log("Request Body:", req.body);

    const application = await prisma.application.create({
      data: {
        company,
        position,
        location,
        jobType,
        salary,
        status,
        applicationUrl,
        contactName,
        contactEmail,
        notes,
        dateApplied: new Date(dateApplied),
      },
    });

    res.status(201).json({
      success: true,
      message: "Application created successfully",
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create application",
      error: error.message,
    });
  }
};

exports.updateApplication = async (req, res) => {
  res.json({
    message: "Update application",
  });
};

exports.deleteApplication = async (req, res) => {
  res.json({
    message: "Delete application",
  });
};