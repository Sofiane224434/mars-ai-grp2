---CODE à COPIER COLLER POUR LES REQUÊTES SQL---

INSERT INTO movies (classification, created_at, description, language, movie_duration, prompt, status, subtitles, synopsis_english, synopsis_original, thumbnail, title_english, title_original, updated_at, videofile, youtube_url) VALUES (:classification, :created_at, :description, :language, :movie_duration, :prompt, :status, :subtitles, :synopsis_english, :synopsis_original, :thumbnail, :title_english, :title_original, :updated_at, :videofile, :youtube_url);

INSERT INTO director_profile (address, address2, city, country, current_job, date_of_birth, director_language, email, firstname, fix_phone, gender, lastname, marketting, mobile_phone, movie_id, postal_code, school) VALUES (:address, :address2, :city, :country, :current_job, :date_of_birth, :director_language, :email, :firstname, :fix_phone, :gender, :lastname, :marketting, :mobile_phone, :movie_id, :postal_code, :school);

INSERT INTO sound_data (movie_id, sound, type) VALUES (:movie_id, :sound, :type);

INSERT INTO used_ai (ai_name, category, movie_id) VALUES (:ai_name, :category, :movie_id);

INSERT INTO socials (movie_id, social_link, social_name) VALUES (:movie_id, :social_link, :social_name);

INSERT INTO screenshots (link, movie_id) VALUES (:link, :movie_id);

SELECT movies.classification, movies.created_at, movies.description, movies.id, movies.language, movies.movie_duration, movies.prompt, movies.status, movies.subtitles, movies.synopsis_english, movies.synopsis_original, movies.thumbnail, movies.title_english, movies.title_original, movies.updated_at, movies.videofile, movies.youtube_url, status.status, director_profile.address, director_profile.address2, director_profile.city, director_profile.country, director_profile.current_job, director_profile.date_of_birth, director_profile.director_language, director_profile.email, director_profile.firstname, director_profile.fix_phone, director_profile.gender, director_profile.lastname, director_profile.marketting, director_profile.mobile_phone, director_profile.postal_code, director_profile.school, sound_data.sound, sound_data.type, used_ai.ai_name, used_ai.category, screenshots.link, socials.social_link, socials.social_name 
FROM movies
LEFT JOIN status ON status.id = movies.status 
LEFT JOIN director_profile ON director_profile.movie_id = movies.id 
LEFT JOIN sound_data ON sound_data.movie_id = movies.id 
LEFT JOIN used_ai ON used_ai.movie_id = movies.id 
LEFT JOIN screenshots ON screenshots.movie_id = movies.id 
LEFT JOIN socials ON socials.movie_id = movies.id 


-- Modèles d'objets à rentrer dans la BDD : 

-- movies = {classification:"", created_at:"", description:"", , language:"", movie_duration:"", prompt:"", status:"", subtitles:"", synopsis_english:"", synopsis_original:"", thumbnail:"", title_english:"", title_original:"", updated_at:"", videofile:"", youtube_url:""}

-- director_profile = {address:"", address2:"", city:"", country:"", current_job:"", date_of_birth:"", director_language:"", email:"", firstname:"", fix_phone:"", gender:"", , lastname:"", marketting:"", mobile_phone:"", movie_id:"", postal_code:"", school:""}

-- sound_data = {movie_id:"", sound:"", type:""}

-- used_ai = {ai_name:"", category:"", , movie_id:""}

-- socials = {movie_id:"", social_link:"", social_name:""}

-- screenshots = {link:"", movie_id:""}

