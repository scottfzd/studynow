<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserQuizResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'quiz_id' => $this->quiz_id,
            'next_repetition' => $this->next_repetition,
            'is_liked' => $this->is_liked,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'quiz' => new QuizResource($this->whenLoaded('quiz')),
            'results' => UserQuizResultsResource::collection($this->whenLoaded('results')),
        ];
    }
}
