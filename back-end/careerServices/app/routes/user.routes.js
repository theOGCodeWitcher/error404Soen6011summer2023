const controller = require("../controllers");
const authController = controller.authController;
const userController = controller.userController;

const config = require("../config");
const endPointConfig = config.endPointConfig;

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    endPointConfig.candidateEndpoint + "/getUserProfile",
    [authController.verifyToken, authController.isCandidate],
    userController.getUserProfile
  );
  app.put(
    endPointConfig.candidateEndpoint + "/updateUserProfile",
    [authController.verifyToken, authController.isCandidate],
    userController.updateUserProfile
  );
  app.get(
    endPointConfig.candidateEndpoint + "/browseJobs",
    [authController.verifyToken, authController.isCandidate],
    userController.browseJobs
  );
  app.post(
    endPointConfig.candidateEndpoint + "/applyJob",
    [authController.verifyToken, authController.isCandidate],
    userController.applyJob
  );

  app.get(
    endPointConfig.employerEndpoint + "/getCandidates",
    [authController.verifyToken, authController.isEmployer],
    userController.browseCandidates
  );

  app.get(
    endPointConfig.employerEndpoint + "/getJobs",
    [authController.verifyToken, authController.isEmployer],
    userController.getJobs
  );
  app.post(
    endPointConfig.employerEndpoint + "/postJob",
    [authController.verifyToken, authController.isEmployer],
    userController.postJob
  );

  app.get(
    endPointConfig.employerEndpoint + "/getApplicants",
    [authController.verifyToken, authController.isEmployer],
    userController.getApplicants
  );
  app.put(
    endPointConfig.employerEndpoint + "/putInterview",
    [authController.verifyToken, authController.isEmployer],
    userController.putInterview
  );
  app.get(
    endPointConfig.adminEndpoint + "/readUsers",
    [authController.verifyToken, authController.isAdmin],
    userController.readUsers
  );
  app.get(
    endPointConfig.adminEndpoint + "/readJobPostings",
    [authController.verifyToken, authController.isAdmin],
    userController.readJobPostings
  );
  app.get(
    "/api/test/candidate/resume",
    [authController.verifyToken, authController.isCandidate],
    userController.generateUserResume
  );
};
