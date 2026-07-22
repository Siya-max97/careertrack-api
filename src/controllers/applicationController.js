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

// PUT /applications/:id
exports.updateApplication = async (req, res) => {
 if (!req.body || Object.keys(req.body).length === 0) {
  return res.status(400).json({
    success: false,
    message: "Request body is required",
  });
}
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    let {
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

// if (status) {
//   status = status.toUpperCase();
// }
console.log(req.body);
    const application = await prisma.application.update({
      where: { id },
      data: {
  company,
  position,
  location,
  jobType,
  salary,
  status: status?.toUpperCase(),
  applicationUrl,
  contactName,
  contactEmail,
  notes,
  dateApplied: dateApplied ? new Date(dateApplied) : undefined,
},
    });
    console.log("about to update:",{id, company, status, dateApplied});
    console.log("update sucessful");

    return res.status(200).json({
      success: true,
      message: "Application updated successfully",
      data: application,
    });
  } catch (error) {
    console.log("update failed");
    return res.status(500).json({
      success: false,
      message: "Failed to update application",
      error: error.message,
    });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.application.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    await prisma.application.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete application",
      error: error.message,
    });
  }
};