--
-- PostgreSQL database dump
--

\restrict vC0dwk6LzdVKJ2mVkTzUp04HtwvEZYiMIgnerlTjdSO3MjtEc4Yj1MTFoZrXBRo

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-09-13 10:40:12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 5026 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 866 (class 1247 OID 17284)
-- Name: tb_usuarios_role_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tb_usuarios_role_enum AS ENUM (
    'ATENDENTE',
    'ADMIN'
);


ALTER TYPE public.tb_usuarios_role_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 17267)
-- Name: tb_usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tb_usuarios (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nome character varying NOT NULL,
    email character varying NOT NULL,
    senha character varying NOT NULL,
    role public.tb_usuarios_role_enum DEFAULT 'ATENDENTE'::public.tb_usuarios_role_enum NOT NULL,
    criado_em timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tb_usuarios OWNER TO postgres;

--
-- TOC entry 4873 (class 2606 OID 17282)
-- Name: tb_usuarios PK_b8032a3a700575eaa4722bf3801; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tb_usuarios
    ADD CONSTRAINT "PK_b8032a3a700575eaa4722bf3801" PRIMARY KEY (id);


-- Completed on 2026-09-13 10:40:12

--
-- PostgreSQL database dump complete
--

\unrestrict vC0dwk6LzdVKJ2mVkTzUp04HtwvEZYiMIgnerlTjdSO3MjtEc4Yj1MTFoZrXBRo

