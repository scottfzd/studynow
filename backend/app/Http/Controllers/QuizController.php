<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Quiz;
use Illuminate\Routing\Controller;

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
            'qcms.*.answers.*.id' => 'required|integer',
            'qcms.*.answers.*.answer' => 'required|string',
            'qcms.*.answers.*.isValid' => 'required|boolean',
        ]);

        $quiz = Quiz::create([
            'name' => $data['name'],
            'owner' => $user->id,
            'type' => 'Quiz',
            'is_public' => $request->has("is_public") ? $request->is_public : false,
            'is_organization' => $request->has("is_organization") ? $request->is_organization : false,
            'likes' => 0,
            'tag_id' => $request->tag_id
        ]);

        foreach ($data['qcms'] as $qcmData) {
            $qcm = $quiz->qcms()->create([
                'question' => $qcmData['question'],
                'answers' => $qcmData['answers']
            ]);
        }

        return response()->json($quiz, 201);
    }


    public function destroy(Request $request, string $id): JsonResponse
    {

        $user = $request->user();

        $quiz = Quiz::where("id", $id)->where("owner", $user->id)->first();

        if (!$quiz) {
            return response()->json(['error' => 'Resource not found'], 404);
        }

        Quiz::destroy($id);
        return response()->json(null, 204);
    }


    public function show(Request $request, string $id): JsonResponse
    {
        $quiz = Quiz::with('qcms')->find($id);

        if (!$quiz) {
            return response()->json(['error' => 'Resource not found'], 404);

        }

        if ($quiz->is_public == false && $user != $quiz->owner) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        return response()->json($quiz, 200);
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
            'qcms.*.answers.*.id' => 'required|integer',
            'qcms.*.answers.*.answer' => 'required|string',
            'qcms.*.answers.*.isValid' => 'required|boolean',
        ]);

        $quiz = Quiz::where("id", $id)->where("owner", $user->id)->first();


        if (!$quiz) {
            return response()->json(['error' => 'Resource not found'], 404);
        }

        $quiz->name = $data["name"];
        $quiz->is_public = $data['is_public'] ? $data['is_public'] : false;
        $quiz->is_organization = $data['is_organization'] ? $data['is_organization'] : false;
        $quiz->tag_id = $data['tag_id'] ? $data['tag_id'] : $quiz->tag_id;
        $quiz->save();


        $quiz->qcms()->delete();

        foreach ($data["qcms"] as $qcmData) {
            $qcm = $quiz->qcms()->create([
                'question' => $qcmData['question'],
                'answers' => $qcmData['answers']
            ]);
        }

        return response()->json($quiz->load("qcms"), 200);
    }

    public function myQuizzes(Request $request): JsonResponse
    {

        $user = $request->user();
        $quizzes = Quiz::where("owner", $user->id)->get();

        if ($quizzes->isEmpty()) {
            return response()->json(['message' => "You haven't yet created any quiz"], 200);
        }

        return response()->json($quizzes, 200);
    }

}
