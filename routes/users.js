const router = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");
const { authorize } = require("../middleware/auth");
const { validateUserProfileData } = require("../middleware/validation");

router.use(authorize);

router.get("/me", getCurrentUser);
router.patch("/me", validateUserProfileData, updateProfile);

module.exports = router;
