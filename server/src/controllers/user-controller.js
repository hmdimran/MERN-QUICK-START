const express = require("express");
const {
  getAll,
  update,
  deleteById,
  getById,
} = require("../services/user-service");
const { NotFound } = require("../common/errors");

const router = express.Router();

const getHandler = async (req, res, next) => {
  try {
    const items = await getAll();
    return res.status(200).send(items);
  } catch (error) {
    return next(error, req, res);
  }
};

const getByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await getById(id);
    if (item) {
      return res.status(200).send(item);
    }
    throw new NotFound(`User not found by the id: ${id}`);
  } catch (error) {
    return next(error, req, res);
  }
};

const putHandler = async (req, res, next) => {
  try {
    const { body } = req;
    const id = await update(body);
    return res.status(200).send(id);
  } catch (error) {
    return next(error, req, res);
  }
};

const deleteHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteById(id);
    return res.status(200).send("User deleted");
  } catch (error) {
    return next(error, req, res);
  }
};

const currentUserHandler = async (req, res) =>
  res.status(200).send({
    success: true,
    data: {
      name: "Serati Ma",
      avatar:
        "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
      userid: "00000001",
      email: "antdesign@alipay.com",
      signature: "海纳百川，有容乃大",
      title: "交互专家",
      group: "蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED",
      tags: [
        {
          key: "0",
          label: "很有想法的",
        },
        {
          key: "1",
          label: "专注设计",
        },
        {
          key: "2",
          label: "辣~",
        },
        {
          key: "3",
          label: "大长腿",
        },
        {
          key: "4",
          label: "川妹子",
        },
        {
          key: "5",
          label: "海纳百川",
        },
      ],
      notifyCount: 12,
      unreadCount: 11,
      country: "China",
      access: "admin",
      geographic: {
        province: {
          label: "浙江省",
          key: "330000",
        },
        city: {
          label: "杭州市",
          key: "330100",
        },
      },
      address: "西湖区工专路 77 号",
      phone: "0752-268888888",
    },
  });

router.get("/:id", getByIdHandler);
router.put("/:id", putHandler);
router.get("/", getHandler);
router.delete("/:id", deleteHandler);
router.get("/currentUser", currentUserHandler);

module.exports = router;
