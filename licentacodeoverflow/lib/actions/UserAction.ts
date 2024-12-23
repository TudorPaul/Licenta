"use server";

import { FilterQuery } from "mongoose";
import Answer from "@/model/model_answer";
import User from "@/model/model_user";
import { dbConnect } from "../db";
import {
  CreateUserParams,
  GetAllUsersParams,
  GetUserByIdParams,
  GetUserStatsParams,
} from "@/types/shared.t";
import Question from "@/model/model_question";

export async function getUserById(params: { userId: string }) {
  try {
    await dbConnect();

    const { userId } = params;

    const user = await User.findOne({ User_Id: userId });
    return user;
  } catch (error) {
    console.log("lib/actions/UserAction.ts: Error getting user:", error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    dbConnect();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.log("lib/actions/UserAction.ts: Error creating user:", error);
    throw error;
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    dbConnect();

    const { searchQuery, filter, page = 1, pageSize = 10 } = params;
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "new_users":
        sortOptions = { joinedAt: -1 };
        break;
      case "old_users":
        sortOptions = { joinedAt: 1 };
        break;

      default:
        break;
    }

    const users = await User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalUsers = await User.countDocuments(query);
    const isNext = totalUsers > skipAmount + users.length;

    return { users, isNext };
  } catch (error) {
    console.log("lib/actions/UserAction.ts: Error getting all users:", error);
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    dbConnect();

    const { userId } = params;

    const user = await User.findOne({ User_Id: userId });

    if (!user) {
      throw new Error("User not found");
    }

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    return {
      user,
      totalQuestions,
      totalAnswers,
    };
  } catch (error) {
    console.log("lib/actions/UserAction.ts: Error getting user info:", error);
    throw error;
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    dbConnect();

    const { userId, page = 1, pageSize = 10 } = params;

    const skipAmount = (page - 1) * pageSize;

    const totalAnswers = await Answer.countDocuments({ author: userId });

    const userAnswers = await Answer.find({ author: userId })
      .skip(skipAmount)
      .limit(pageSize)
      .populate("question", "_id title")
      .populate("author", "_id User_Id name picture");

    const isNextAnswer = totalAnswers > skipAmount + userAnswers.length;

    return { totalAnswers, answers: userAnswers, isNextAnswer };
  } catch (error) {
    console.log(
      "lib/actions/UserAction.ts: Error getting user answers:",
      error
    );
    throw error;
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    dbConnect();

    const { userId, page = 1, pageSize = 10 } = params;

    const skipAmount = (page - 1) * pageSize;

    const totalQuestions = await Question.countDocuments({ author: userId });

    const userQuestions = await Question.find({ author: userId })
      .sort({ createdAt: -1, views: -1 })
      .skip(skipAmount)
      .limit(pageSize)
      .populate("tags", "_id name")
      .populate("author", "_id User_Id name picture");

    const isNextQuestions = totalQuestions > skipAmount + userQuestions.length;

    return { totalQuestions, questions: userQuestions, isNextQuestions };
  } catch (error) {
    console.log(
      "lib/actions/UserAction.ts: Error getting user questions:",
      error
    );
    throw error;
  }
}
