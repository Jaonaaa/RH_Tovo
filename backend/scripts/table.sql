

CREATE TABLE IF NOT EXISTS departement (
    id  SERIAL PRIMARY KEY ,
    nom VARCHAR(60) ,
    description VARCHAR(255) ,
    icon VARCHAR(255) ,
    color VARCHAR(255) ,
);

CREATE TABLE IF NOT EXISTS login_departement(
    id SERIAL PRIMARY KEY ,
    nom VARCHAR(60) ,
    email VARCHAR(120),
    mdp VARCHAR(100),
    id_departement INT REFERENCES departement (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS details_requete_departement (
    id SERIAL PRIMARY KEY ,
    vol_tache NUMERIC(20,2),
    vol_horaire NUMERIC(20,2),
    vol_hommme_jour NUMERIC(20),
    taches VARCHAR(255) ,
    poste VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS requete_departement (
    id SERIAL PRIMARY KEY ,
    id_details_requete_departement INT REFERENCES details_requete_departement(id),
    date_requete timestamp ,
    id_departement INT REFERENCES departement (id) ON DELETE CASCADE 
);

CREATE TABLE IF NOT EXISTS annonce (
    id SERIAL PRIMARY KEY,
    date_annonce timestamp ,
    titre VARCHAR(255),
    id_departement INT REFERENCES departement (id) ON DELETE CASCADE
); 

CREATE TABLE IF NOT EXISTS question (
    id SERIAL PRIMARY KEY,
    type VARCHAR(30) 
);

CREATE TABLE IF NOT EXISTS question_reponse_p (
    id SERIAL PRIMARY KEY,
    id_question INT REFERENCES question (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reponse_p (
    id_question_reponse_p int REFERENCES question_reponse_p (id) ON DELETE CASCADE,
    label VARCHAR(150),
    correct boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS annonce_details (
    id SERIAL PRIMARY KEY ,
    id_annonce INT REFERENCES annonce (id) ON DELETE CASCADE,
    label_critere VARCHAR(150),
    coef NUMERIC(10,2) NOT NULL,
    id_question_reponse_p INT REFERENCES question_reponse_p (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS critere_par_defaut (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS candidat (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(30),
    code_id VARCHAR(50) 
);

CREATE TABLE IF NOT EXISTS cv_candidat_details (
    id SERIAL PRIMARY KEY,
    label_critere VARCHAR(150),
    par_defaut boolean,
    valeur VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS annonce_cv_candidat (
    id SERIAL PRIMARY KEY ,
    id_annonce INT REFERENCES annonce (id) ON DELETE CASCADE ,
    date_depot timestamp NOT NULL ,
    id_candidat INT REFERENCES candidat (id) ON DELETE CASCADE,
    id_cv_candidat_details INT REFERENCES cv_candidat_details ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS employer (
    id SERIAL PRIMARY KEY,
    id_candidat INT REFERENCES candidat (id) ON DELETE CASCADE,
    id_annonce_cv_candidat INT REFERENCES annonce_cv_candidat (id)  ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS test_annonce (
    id SERIAL PRIMARY KEY,
    id_annonce INT REFERENCES annonce (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS test_candidat (
    id SERIAL PRIMARY KEY,
    id_test_annonce INT REFERENCES test_annonce (id) ON DELETE CASCADE,
    id_candidat INT REFERENCES candidat (id) ON DELETE CASCADE,
    score NUMERIC(10,3)
);

CREATE TABLE IF NOT EXISTS test_question (
    id SERIAL PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    id_test_annonce INT REFERENCES test_annonce (id) ON DELETE CASCADE,
    id_question_reponse_p INT REFERENCES question_reponse_p (id) ON DELETE CASCADE,
    coef NUMERIC(10,3)
);

INSERT INTO departement VALUES (default,'IT','Département technologique','it');
INSERT INTO departement VALUES (default,'Juridique','Département juridique','juridique');
INSERT INTO departement VALUES (default,'Marketing','Département marketing','marketing');
INSERT INTO departement VALUES (default,'RH','Département des ressources humaines','humain');

-- mamerina id_serial à 1
ALTER SEQUENCE departement_id_seq RESTART WITH 1
ALTER SEQUENCE details_requete_departement_id_seq RESTART WITH 1