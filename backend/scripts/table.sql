

CREATE TABLE IF NOT EXISTS departement (
    id  SERIAL PRIMARY KEY ,
    nom VARCHAR(60) ,
    description VARCHAR(255) ,
    icon VARCHAR(255) ,
    color VARCHAR(255) 
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
    id SERIAL PRIMARY KEY,
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
    nom VARCHAR(50),
    id_question_reponse_p INT REFERENCES question_reponse_p (id) ON DELETE CASCADE,
    coeff NUMERIC(10,2) 
);

CREATE TABLE IF NOT EXISTS candidat (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(30),
    code_id VARCHAR(50) 
);

CREATE TABLE IF NOT EXISTS annonce_cv_candidat (
    id SERIAL PRIMARY KEY ,
    id_annonce INT REFERENCES annonce (id) ON DELETE CASCADE ,
    date_depot timestamp NOT NULL ,
    id_candidat INT REFERENCES candidat (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cv_candidat_details (
    id SERIAL PRIMARY KEY,
    id_annonce_cv_candidat INT REFERENCES annonce_cv_candidat (id)  ON DELETE CASCADE ,
    valeur NUMERIC(15,2),
    id_annonce_details INT REFERENCES annonce_details (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS qualified_test (
    id SERIAL PRIMARY KEY,
    id_candidat INT REFERENCES candidat (id)  ON DELETE CASCADE ,
    id_annonce INT REFERENCES annonce (id) ON DELETE CASCADE ,
    score NUMERIC(10,2) ,
    validate BOOLEAN 
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

INSERT INTO departement VALUES (default,'IT','Departement technologique','it');
INSERT INTO departement VALUES (default,'Juridique','Departement juridique','juridique');
INSERT INTO departement VALUES (default,'Marketing','Departement marketing','marketing');
INSERT INTO departement VALUES (default,'RH','Departement des ressources humaines','humain');

-- mamerina id_serial à 1
ALTER SEQUENCE departement_id_seq RESTART WITH 1
ALTER SEQUENCE details_requete_departement_id_seq RESTART WITH 1
ALTER SEQUENCE details_requete_departement_id_seq RESTART WITH 1

--login
INSERT INTO login_departement VALUES (default,'Sergio','it_dep@gmail.com','1ItDep',1);
INSERT INTO login_departement VALUES (default,'Paul','juridique_dep@gmail.com','2JuridiqueDep',2);
INSERT INTO login_departement VALUES (default,'Faniry','marketing_dep@gmail.com','3MarketinDep',3);
INSERT INTO login_departement VALUES (default,'RH','rh_dep@gmail.com','1RhDep',4);

INSERT INTO question VALUES (default,'Select');
INSERT INTO question VALUES (default,'Choix multiple');
INSERT INTO question VALUES (default,'Nombre');
INSERT INTO question VALUES (default,'Text');

-- critere par default 
-- diplome 
INSERT INTO question_reponse_p VALUES (default,1);
INSERT INTO reponse_p VALUES (default,1,'Bacc',true);
INSERT INTO reponse_p VALUES (default,1,'Licence',true);
INSERT INTO reponse_p VALUES (default,1,'Master',true);
INSERT INTO critere_par_defaut VALUES (default,'Diplome',1,5);
-- Expérience 
INSERT INTO question_reponse_p VALUES (default,3);
INSERT INTO critere_par_defaut VALUES (default,'Expérience',2,4)
-- gereo conflit eee XDD

--Testeo le function , ataovy valeur mi existe amzay aloha 
-- calcul anleh note jereo kao aona ny hanaovana azy
-- de veo vita zay rehetra zay de le test amzay asurreo


--  SELECT * FROM annonce_details JOIN reponse_p ON annonce_details.id_question_reponse_p
-- = reponse_p.id_question_reponse_p   where id_annonce = 16 ;

-- INSERT INTO reponse_p VALUES (default,21,'Test 1',true);
-- INSERT INTO reponse_p VALUES (default,21,'Test 2',false);


-- INSERT INTO reponse_p VALUES (default,22,'French',true);
-- INSERT INTO reponse_p VALUES (default,22,'English',true);
-- INSERT INTO reponse_p VALUES (default,22,'Japanese',false);

