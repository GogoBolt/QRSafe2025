/*
  # Student Tracking System Schema

  1. New Tables
    - `students`
      - Basic student information
      - Class assignment
      - Parent relationship
    - `classes`
      - Class information and schedules
    - `teachers`
      - Teacher information
    - `subjects`
      - Subject/course information
    - `bus_trips`
      - Bus transportation records
    - `bus_drivers`
      - Driver information
    - `chat_history`
      - Store chat interactions
    
  2. Security
    - Enable RLS on all tables
    - Policies for authenticated parents to access only their children's data
*/

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  class_id uuid NOT NULL,
  parent_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create classes table
CREATE TABLE IF NOT EXISTS classes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  grade text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  teacher_id uuid NOT NULL,
  class_id uuid NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  day_of_week integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create bus_drivers table
CREATE TABLE IF NOT EXISTS bus_drivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text,
  created_at timestamptz DEFAULT now()
);

-- Create bus_trips table
CREATE TABLE IF NOT EXISTS bus_trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bus_number text NOT NULL,
  driver_id uuid NOT NULL,
  student_id uuid NOT NULL,
  pickup_time timestamptz,
  arrival_time timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create chat_history table
CREATE TABLE IF NOT EXISTS chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL,
  message text NOT NULL,
  response text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bus_trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Parents can view their children's data"
  ON students
  FOR SELECT
  TO authenticated
  USING (parent_id = auth.uid());

CREATE POLICY "Parents can view their children's classes"
  ON classes
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.class_id = classes.id
      AND students.parent_id = auth.uid()
    )
  );

CREATE POLICY "Parents can view their children's subjects"
  ON subjects
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.class_id = subjects.class_id
      AND students.parent_id = auth.uid()
    )
  );

CREATE POLICY "Parents can view their children's bus trips"
  ON bus_trips
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM students
      WHERE students.id = bus_trips.student_id
      AND students.parent_id = auth.uid()
    )
  );

CREATE POLICY "Parents can view their chat history"
  ON chat_history
  FOR SELECT
  TO authenticated
  USING (parent_id = auth.uid());

CREATE POLICY "Parents can create chat messages"
  ON chat_history
  FOR INSERT
  TO authenticated
  WITH CHECK (parent_id = auth.uid());