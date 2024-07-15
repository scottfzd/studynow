<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Quiz;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\QuizResource;
use App\Http\Resources\QuizCollection;

class QuizController extends Controller
{

    public function store(Request $request): JsonResponse
    {
        $user = $request->user();

        $data = $request->validate([
            'name' => 'required|string',
            'is_public' => 'boolean',
            'is_organization' => 'boolean',
            'tag_id' => 'required|integer',
            'qcms' => 'required|array',
            'qcms.*.question' => 'required|string',
            'qcms.*.answers' => 'required|array|size:4',
            'qcms.*.answers.*.answer' => 'required|string',
            'qcms.*.answers.*.isValid' => 'required|boolean',
        ]);

        $quiz = Quiz::create([
            'name' => $data['name'],
            'user_id' => $user->id,
            'type' => 'Quiz',
            'is_public' => $request->has("is_public") ? $request->is_public : false,
            'is_organization' => $request->has("is_organization") ? $request->is_organization : false,
            'likes' => 0,
            'tag_id' => $request->tag_id
        ]);

        foreach ($data['qcms'] as $qcmData) {
            $quiz->qcms()->create([
                'question' => $qcmData['question'],
                'answers' => $qcmData['answers']
            ]);
        }

        return response()->json($quiz, 201);
    }


    public function destroy(Request $request, string $id): JsonResponse
    {

        $user = $request->user();

        $quiz = Quiz::where("id", $id)->where("user_id", $user->id)->first();

        if (!$quiz) {
            return response()->json(['message' => 'Quizz not found'], 404);
        }

        Quiz::destroy($id);
        return response()->json(null, 204);
    }


    public function show(Request $request, string $id): JsonResponse
    {
        $user = Auth::guard('sanctum')->user();

        $quiz = Quiz::with('qcms', 'user')->find($id);


        if (!$quiz) {
            return response()->json(['message' => 'Quizz not found'], 404);

        }


        if ($quiz->is_public == false) {

            if (!$user) {
                return response()->json(["message" => "Unauthorized"], 401);
            }

            if ($user->id != $quiz->user_id) {
                return response()->json(['message' => 'Forbidden'], 403);
            }

        }

        return response()->json(new QuizResource($quiz), 200);
    }


    public function update(Request $request, string $id): JsonResponse
    {

        $user = $request->user();

        $data = $request->validate([
            'name' => 'required|string',
            'is_public' => 'boolean',
            'is_organization' => 'boolean',
            'tag_id' => 'integer',
            'qcms' => 'required|array',
            'qcms.*.question' => 'required|string',
            'qcms.*.answers' => 'required|array|size:4',
            'qcms.*.answers.*.answer' => 'required|string',
            'qcms.*.answers.*.isValid' => 'required|boolean',
        ]);

        $quiz = Quiz::where("id", $id)->where("user_id", $user->id)->first();


        if (!$quiz) {
            return response()->json(['message' => 'Quizz not found'], 404);
        }

        $quiz->name = $data["name"];
        $quiz->is_public = $data['is_public'] ? $data['is_public'] : false;
        $quiz->is_organization = $request->has("is_public") ? $request->is_public : false;
        $quiz->tag_id = $data['tag_id'] ? $data['tag_id'] : $quiz->tag_id;
        $quiz->save();


        $quiz->qcms()->delete();

        foreach ($data["qcms"] as $qcmData) {
            $quiz->qcms()->create([
                'question' => $qcmData['question'],
                'answers' => $qcmData['answers']
            ]);
        }

        return response()->json($quiz->load("qcms"), 200);
    }

    public function index(Request $request): JsonResponse
    {
        $numberPerPage = 9;
        $isSearch = $request->has("search");

        if ($request->has("myQuizzes")) {

            $user = Auth::guard('sanctum')->user();
            if (!$user) {
                return response()->json(["message" => "Unauthorized"], 401);
            }

            $quizzes = Quiz::where("user_id", $user->id)->get();
            if ($quizzes->isEmpty()) {
                return response()->json(['message' => "You haven't created any quiz yet"], 200);
            }

        } else {
            $quizzes = Quiz::where("is_public", true);
        }

        if ($isSearch) {
            $search = $request->input("search");
            $searchTerm = "%{$search}%";

            $quizzes = $quizzes->where('name', 'ILIKE', $searchTerm);

            $tag_ids = Tag::where('name', 'ILIKE', $searchTerm)->pluck('id');

            $user_ids = User::where('name', 'ILIKE', $searchTerm)->pluck('id');

            $quizzes = $quizzes->orWhereIn("tag_id", $tag_ids)->orWhereIn("user_id", $user_ids);
        }

        return response()->json(new QuizCollection($quizzes->paginate($numberPerPage)), 200);
    }
}