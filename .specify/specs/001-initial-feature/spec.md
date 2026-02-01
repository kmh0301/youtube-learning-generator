# Specification: YouTube Professional Learning Pack Generator

## 1. Overview
A web application that generates professional language learning materials from YouTube videos, tailored to specific career identities (Lawyer, Engineer, PM, Student).

## 2. Core User Journey
1. User pastes a YouTube URL.
2. User selects Identity and Learning Field.
3. System fetches transcript and generates structured learning content.
4. User studies via Tabs (Vocab, Cloze, Shadowing, Quiz).
5. User exports content to Markdown.

## 3. Functional Requirements
- **Input**: URL validation, Dropdowns for Identity/Field.
- **Processing**: Fetch subtitles (mock/real), Extract keywords based on identity.
- **Output**: 
  - Vocabulary List (Word, Definition, Context, Importance).
  - Cloze Test (Fill-in-the-blank from transcript).
  - Shadowing (Time-stamped audio segments text).
  - Quiz (Multiple choice/Short answer).
  - Statistics (Word count, Topic coverage).
- **Export**: Download as Markdown file.
