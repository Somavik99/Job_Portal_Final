import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import path from 'path';
const UPLOAD_FOLDER = 'uploads';

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer not allowed to access this resource.", 400)
    );
  }

  const { name, email, coverLetter, phone, address, jobId } = req.body;

  if (!name || !email || !coverLetter || !phone || !address || !jobId) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }

  if (!jobId) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  const applicantID = {
    user: req.user._id,
    role: "Job Seeker",
  };

  const employerID = {
    user: jobDetails.postedBy,
    role: "Employer",
  };

  let resumeFileName; // Variable to store the resume file name
  let resumeUrl; // Variable to store the resume URL

  if (req.files && req.files.resume) {
    const resume = req.files.resume;

    // Generate a unique file name for the resume
    resumeFileName = `${Date.now()}_${resume.name}`;

    // Move the uploaded resume file to the server's upload folder
    const filePath = path.join(UPLOAD_FOLDER, resumeFileName);
    await resume.mv(filePath);

    // Construct the URL to access the uploaded resume
    resumeUrl = `http://localhost:4000/uploads/${resumeFileName}`; // Update this with your server URL
  }

  // Create application data including resume file name and URL if it exists
  const applicationData = {
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantID,
    employerID,
    resume: resumeFileName, // Store the resume file name
    resumeUrl: resumeUrl, // Store the resume URL
  };

  // Create the application in the database
  const application = await Application.create(applicationData);

  // Send success response with the created application
  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
  });
});


export const employerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobseekerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const jobseekerDeleteApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(
        new ErrorHandler("Employer not allowed to access this resource.", 400)
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Application not found!", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted!",
    });
  }
);