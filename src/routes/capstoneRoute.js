const express = require("express");
const {
  getImage,
  getImageName,
  getInfoImgNUer,
  getInfoComment,
  getCheckSaveImg,
  getUser,
  getImgUserSave,
  getImgUserCreate,
  deleteImg,
  login,
  signUp,
  updateImgUser,
  updateInfoUser,
  saveInfoComment,
} = require("../controllers/capstoneController");
const { guard } = require("../controllers/authController");

const capstoneRouter = express.Router();

capstoneRouter.get("/get-image", guard, getImage);
capstoneRouter.get("/get-imageName", guard, getImageName);
capstoneRouter.get("/get-infoImg-user", guard, getInfoImgNUer);
capstoneRouter.get("/get-infoComment/:hinh_id", guard, getInfoComment);
capstoneRouter.get("/get-checkImg/:hinh_id", guard, getCheckSaveImg);
capstoneRouter.get("/get-user", guard, getUser);
capstoneRouter.get("/get-img-user/:nguoi_dung_id", guard, getImgUserSave);
capstoneRouter.get("/get-img-user-create", guard, getImgUserCreate);
capstoneRouter.delete("/remove-img/:nguoi_dung_id", guard, deleteImg);
capstoneRouter.post("/post-login", guard, login);
capstoneRouter.post("/post-signup", guard, signUp);
capstoneRouter.post("/post-img", guard, updateImgUser);
capstoneRouter.post("/post-saveCmt", guard, saveInfoComment);
capstoneRouter.put("/put-user/:nguoi_dung_id", guard, updateInfoUser);

module.exports = capstoneRouter;
