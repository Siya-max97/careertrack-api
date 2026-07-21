exports.getApplications = async (req, res) => {
  res.json({
    message: "Get all applications"
  });
};

exports.getApplication = async (req, res) => {
  res.json({
    message: "Get one application"
  });
};

exports.createApplication = async (req, res) => {
  res.json({
    message: "Create application"
  });
};

exports.updateApplication = async (req, res) => {
  res.json({
    message: "Update application"
  });
};

exports.deleteApplication = async (req, res) => {
  res.json({
    message: "Delete application"
  });
};