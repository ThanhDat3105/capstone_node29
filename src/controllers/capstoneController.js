const { Op } = require("sequelize");
// import hàm quản lý các đối tượng model
const initModels = require("../models/init-models");

// import chuỗi kết nối CSDL
const sequelize = require("../models/index");
const { successCode, failCode } = require("../config/response");
const { createToken } = require("../config/jwt");

// đối tượng chứa các model trong db
const model = initModels(sequelize);

const getImage = async (req, res) => {
  try {
    let data = await model.hinh_anh.findAll();
    successCode(res, data, "lấy dữ liệu thành công");
  } catch (error) {
    failCode(res, "lỗi BE");
  }
};

const getImageName = async (req, res) => {
  try {
    let { name } = req.query;

    let data = await model.hinh_anh.findAll({
      where: {
        ten_hinh: {
          [Op.like]: `%${name}%`,
        },
      },
    });

    successCode(res, data, "lấy dữ liệu thành công");
  } catch (error) {
    failCode(res, "lỗi BE");
  }
};

const getInfoImgNUer = async (req, res) => {
  try {
    let data = await model.hinh_anh.findAll({ include: ["nguoi_dung"] });

    successCode(res, data, "lấy dữ liệu thành công");
  } catch (error) {
    failCode(res, "lỗi BE");
  }
};

const getInfoComment = async (req, res) => {
  try {
    let { hinh_id } = req.params;

    let data = await model.hinh_anh.findAll({
      where: { hinh_id },
      include: ["binh_luans"],
    });

    successCode(res, data, "lấy dữ liệu thành công");
  } catch (error) {
    failCode(res, "lỗi BE");
  }
};

const getCheckSaveImg = async (req, res) => {
  try {
    let { hinh_id } = req.params;

    let data = await model.luu_anh.findAll({ where: { hinh_id } });

    if (data.length != 0) {
      successCode(res, "đã lưu");
    } else {
      successCode(res, "chưa lưu");
    }
  } catch (error) {
    failCode(res, "lỗi BE");
  }
};

const getUser = async (req, res) => {
  try {
    let data = await model.nguoi_dung.findAll();

    successCode(res, data, "lấy dữ liệu thành công");
  } catch (error) {
    failCode(res, "lỗi BE");
  }
};

const getImgUserSave = async (req, res) => {
  // try {
    let { nguoi_dung_id } = req.params;

    let data = await model.luu_anh.findAll({ where: { nguoi_dung_id } });

    successCode(res, data, "lấy dữ liệu thành công");
  // } catch (error) {
  //   failCode(res, "lỗi BE");
  // }
};

const getImgUserCreate = async (req, res) => {
  try {
    let data = await model.hinh_anh.findAll({ include: ["luu_anhs"] });

    successCode(res, data, "lấy dữ liệu thành công");
  } catch (error) {
    failCode(res, "lỗi BE");
  }
};

const deleteImg = async (req, res) => {
  try {
    let { nguoi_dung_id } = req.params;

    await model.hinh_anh.destroy({ where: { nguoi_dung_id } });

    successCode(res, "xóa thành công");
  } catch (error) {
    failCode(res, "lỗi BE");
  }
};

const login = async (req, res) => {
  try {
    const { email, mat_khau } = req.body;

    let checkUser = await model.nguoi_dung.findOne({ where: { email } });

    if (checkUser) {
      let token = createToken(checkUser);
      if (checkUser.mat_khau == mat_khau) {
        successCode(res, token, "đăng nhập thành công");
      } else {
        failCode(res, "passWord not found");
      }
    } else {
      failCode(res, "email not found");
    }
  } catch (error) {
    failCode(res, "lỗi BE");
  }
};

const signUp = async (req, res) => {
  try {
    const { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;
    let data = { email, mat_khau, ho_ten, tuoi, anh_dai_dien };

    await model.nguoi_dung.create(data);
    successCode(res, "đăng ký thành công");
  } catch (error) {
    failCode(res, "lỗi BE");
  }
};

const updateImgUser = async (req, res) => {
  try {
    const { ten_hinh, duong_dan, mo_ta, nguoi_dung_id } = req.body;
    let data = { ten_hinh, duong_dan, mo_ta, nguoi_dung_id };

    await model.hinh_anh.create(data);
    successCode(res, "thêm hình thành công");
  } catch (error) {
    failCode(res, "lỗi BE");
  }
};

const updateInfoUser = async (req, res) => {
  try {
    let { nguoi_dung_id } = req.params;

    const { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;

    let data = { email, mat_khau, ho_ten, tuoi, anh_dai_dien };

    await model.nguoi_dung.update(data, { where: { nguoi_dung_id } });

    successCode(res, data, "thêm người dùng thành công");
  } catch (error) {
    failCode(res, "lỗi BE");
  }
};

const saveInfoComment = async (req, res) => {
  try {
    const { nguoi_dung_id, hinh_id, ngay_binh_luan, noi_dung } = req.body;

    let data = { nguoi_dung_id, hinh_id, ngay_binh_luan, noi_dung };

    await model.binh_luan.create(data);
    successCode(res, data, "lưu thành công thành công");
  } catch (error) {
    failCode(res, "lỗi BE");
  }
};
module.exports = {
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
};
