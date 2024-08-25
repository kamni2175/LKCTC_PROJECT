const express = require("express");
const { isAuthenticate } = require("../middlewares/isAuthenticate");
const GatePasses = require("../schemas/gatePass");
const router = express.Router();

router.post("/create-pass", isAuthenticate, async (req, res) => {
  try {
    const { date, time, endtime, reason } = req.body;
    //cheking all field are has
    if (!date || !time || !endtime || !reason)
      return res.send({ success: false, message: "all fields are required" });

    if (!req.user?.isVarified && !req.user?.role == "teacher")
      return res.send({
        success: false,
        message: "you are not varified or you are not a teacher",
      });

    const newGatePass = new GatePasses({
      userName: req?.user?.name,
      date,
      exitTime: time,
      returnTime: endtime,
      department: req?.user?.department,
      message: reason,
      email: req?.user?.email,
    });

    await newGatePass.save();

    return res.send({
      success: true,
      message: "Request Send Successfully",
      gatePass: newGatePass,
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

router.get("/getall-request-of-teacher", isAuthenticate, async (req, res) => {
  try {
    const requests = await GatePasses.find({ email: req?.user?.email });

    return res.send({
      success: true,
      message: "all request fetch",
      requests: requests || [],
    });
  } catch (error) {
    console.log(error.message);
    return res.send({ success: false, message: error.message });
  }
});
router.get("/all-requests", isAuthenticate, async (req, res) => {
  try {
    if (req?.user?.role == "teacher" || req?.user?.role == "keeper")
      return res.send({
        success: false,
        message: "you cannot access this data",
      });

    let requests = [];

    if (req?.user?.role == "hod") {
      requests = await GatePasses.find({ department: req?.user?.department });
    }

    if (req?.user?.role == "director") {
      requests = await GatePasses.find({ hodStatus: "confirm" });
    }

    return res.send({
      success: true,
      message: "all request fetch",
      requests: requests || [],
    });
  } catch (error) {
    console.log(error.message);
    return res.send({ success: false, message: error.message });
  }
});

router.post("/update-status-of-pass", isAuthenticate, async (req, res) => {
  try {
    const { gatepassid, status } = req.body;

    if (!gatepassid)
      return res.send({ success: false, message: "gate pass id is required" });
    const gatepass = await GatePasses.findById(gatepassid);

    if (!gatepass)
      return res.send({ success: false, message: "gate pass not found" });

    if (req?.user?.role == "hod") {
      gatepass.hodStatus = status;
    }
    if (req?.user?.role == "director") {
      gatepass.directorStatus = status;
    }

    await gatepass?.save();

    return res.send({
      success: true,
      message: `status updated! ${status}`,
      gatepass,
    });
  } catch (error) {
    console.log(error.message);
    return res.send({ success: false, message: error.message });
  }
});

router.post("/cancel-request", isAuthenticate, async (req, res) => {
  try {
    const { gatePassid } = req.body;

    const request = await GatePasses.findById(gatePassid);

    if (req.user?.email !== request?.email) {
      return res.send({ success: false, message: "this is not your request" });
    }

    await request.deleteOne();

    return res.send({ success: true, message: "Request cancel!" });
  } catch (error) {
    console.log(error.message);
    return res.send({ success: false, message: error.message });
  }
});

module.exports = router;
