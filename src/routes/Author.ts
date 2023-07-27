import express from "express";
import AuthorController from "../controllers/AuthorController";

const router = express.Router();

router.post("/create", AuthorController.createAuthor);
router.get("/get/:authorId", AuthorController.getAuthor);
router.get("/get1", AuthorController.getAllAuthors);
router.patch("/update/:authorId", AuthorController.updateAuthor);
router.delete("/delete/:authorId", AuthorController.deleteAuthor);

export = router;
