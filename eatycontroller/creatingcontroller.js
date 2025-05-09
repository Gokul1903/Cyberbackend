const Jobs=require("../model/Jobs")

const addJob = async (req, res) => {
  try {
    const {
      jobTitle,
      companyName,
      location,
      jobType,
      salaryMin,
      salaryMax,
      applicationDeadline,
      jobDescription,
      imageUrl

    } = req.body;
    const image=req.file ? `/uploads/${imageUrl}`:null;

    if (!jobTitle || !companyName || !location || !jobType || !salaryMin || !salaryMax || !applicationDeadline || !jobDescription) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const newJob = new Jobs({
      jobTitle,
      companyName,
      location,
      jobType,
      salaryRange: { min: salaryMin, max: salaryMax },
      applicationDeadline,
      jobDescription,
      image

    });

    await newJob.save();
    return res.status(201).json({ success: true, message: "Job created", job: newJob });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const viewJob = async (req, res) => {
  try {
    const jobs = await Jobs.find().sort({ createdAt: +1 });
    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addJob, viewJob };
