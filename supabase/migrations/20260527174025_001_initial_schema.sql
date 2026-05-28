/*
  # Initial Schema for PlayBoost AI

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `venue_name` (text, venue/business name)
      - `sport_types` (text[], array of sports)
      - `location` (text)
      - `phone` (text)
      - `avatar_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `captions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `venue_name` (text)
      - `sport_type` (text)
      - `tournament_name` (text)
      - `offer_details` (text)
      - `date_time` (text)
      - `prize_pool` (text)
      - `available_slots` (integer)
      - `location` (text)
      - `audience_type` (text)
      - `tone` (text)
      - `instagram_caption` (text)
      - `whatsapp_message` (text)
      - `facebook_post` (text)
      - `hashtags` (text[])
      - `headline` (text)
      - `story_idea` (text)
      - `ad_copy` (text)
      - `is_favorite` (boolean, default false)
      - `created_at` (timestamp)

    - `templates`
      - `id` (uuid, primary key)
      - `name` (text)
      - `category` (text)
      - `sport_type` (text)
      - `template_content` (text)
      - `preview_text` (text)
      - `is_premium` (boolean, default false)
      - `usage_count` (integer, default 0)
      - `created_at` (timestamp)

    - `user_analytics`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `captions_generated` (integer, default 0)
      - `hashtags_generated` (integer, default 0)
      - `templates_used` (integer, default 0)
      - `top_sport` (text)
      - `top_tone` (text)
      - `last_generated_at` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Users can only access their own data
    - Templates are readable by all authenticated users
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  venue_name text DEFAULT '',
  sport_types text[] DEFAULT '{}',
  location text DEFAULT '',
  phone text DEFAULT '',
  avatar_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Captions table
CREATE TABLE IF NOT EXISTS captions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  venue_name text DEFAULT '',
  sport_type text DEFAULT '',
  tournament_name text DEFAULT '',
  offer_details text DEFAULT '',
  date_time text DEFAULT '',
  prize_pool text DEFAULT '',
  available_slots integer DEFAULT 0,
  location text DEFAULT '',
  audience_type text DEFAULT '',
  tone text DEFAULT 'professional',
  instagram_caption text DEFAULT '',
  whatsapp_message text DEFAULT '',
  facebook_post text DEFAULT '',
  hashtags text[] DEFAULT '{}',
  headline text DEFAULT '',
  story_idea text DEFAULT '',
  ad_copy text DEFAULT '',
  is_favorite boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Templates table
CREATE TABLE IF NOT EXISTS templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  sport_type text DEFAULT '',
  template_content text NOT NULL,
  preview_text text DEFAULT '',
  is_premium boolean DEFAULT false,
  usage_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- User Analytics table
CREATE TABLE IF NOT EXISTS user_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  captions_generated integer DEFAULT 0,
  hashtags_generated integer DEFAULT 0,
  templates_used integer DEFAULT 0,
  top_sport text DEFAULT '',
  top_tone text DEFAULT '',
  last_generated_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE captions ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_analytics ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Captions policies
CREATE POLICY "Users can view own captions"
  ON captions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own captions"
  ON captions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own captions"
  ON captions FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own captions"
  ON captions FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Templates policies
CREATE POLICY "Authenticated users can view templates"
  ON templates FOR SELECT
  TO authenticated
  USING (true);

-- User Analytics policies
CREATE POLICY "Users can view own analytics"
  ON user_analytics FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own analytics"
  ON user_analytics FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own analytics"
  ON user_analytics FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Insert default templates
INSERT INTO templates (name, category, sport_type, template_content, preview_text) VALUES
('Weekend Tournament Hype', 'tournament', 'cricket', '🏏 Weekend Cricket Championship Alert! 
{prize_pool} Prize Pool 
{slots} Teams Maximum
{date}
Register now: {link}
#CricketFever #WeekendTournament', 'Weekend cricket tournament with exciting prizes...'),
('Last Minute Slots', 'offer', 'general', '⚡ FLASH ALERT! 
{slots} slots left for {date}
{discount}% OFF for quick bookings
Book NOW: {link}
#LastMinute #BookNow', 'Limited slots available with special discounts...'),
('Tournament Registration Open', 'tournament', 'football', '⚽ REGISTRATIONS OPEN!
{venue} presents {tournament}
Prize: {prize_pool}
Date: {date}
Register: {link}
#FootballTournament #PlayToWin', 'Football tournament registration announcement...'),
('Happy Hour Special', 'offer', 'general', '🎉 HAPPY HOUR SPECIAL!
{discount}% OFF on all bookings
Time: {time}
Venue: {venue}
#HappyHour #SportsDeals', 'Special happy hour discount offer...'),
('Team Registration', 'tournament', 'general', '🏆 TEAM REGISTRATION NOW OPEN!
{tournament}
Sport: {sport}
Prize Pool: {prize_pool}
{slots} Teams Only
#TeamUp #TournamentMode', 'Team registration announcement...'),
('Rainy Day Offer', 'offer', 'general', '🌧️ RAINY DAY SPECIAL!
Indoor courts available
{discount}% OFF today!
{venue}
#RainyDayDeal #IndoorSports', 'Special offer for rainy weather...');

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_captions_user_id ON captions(user_id);
CREATE INDEX IF NOT EXISTS idx_captions_created_at ON captions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category);
CREATE INDEX IF NOT EXISTS idx_user_analytics_user_id ON user_analytics(user_id);
