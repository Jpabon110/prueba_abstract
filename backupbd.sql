PGDMP         "            
    w           Abstract    12.1    12.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16395    Abstract    DATABASE     �   CREATE DATABASE "Abstract" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Spain.1252' LC_CTYPE = 'Spanish_Spain.1252';
    DROP DATABASE "Abstract";
                postgres    false            �            1259    16453    events    TABLE     �   CREATE TABLE public.events (
    id bigint NOT NULL,
    name character varying(20),
    types_game_id integer,
    created_at time with time zone,
    updated_at time with time zone,
    enclosure integer,
    date_play timestamp(6) with time zone
);
    DROP TABLE public.events;
       public         heap    postgres    false            �            1259    16451    events_id_seq    SEQUENCE     v   CREATE SEQUENCE public.events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.events_id_seq;
       public          postgres    false    203                       0    0    events_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;
          public          postgres    false    202            �            1259    16478    players    TABLE     	  CREATE TABLE public.players (
    id bigint NOT NULL,
    name character varying(50),
    status_email character varying(50),
    event_id integer,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email character varying(50)
);
    DROP TABLE public.players;
       public         heap    postgres    false            �            1259    16476    players2_id_seq    SEQUENCE     x   CREATE SEQUENCE public.players2_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.players2_id_seq;
       public          postgres    false    207                       0    0    players2_id_seq    SEQUENCE OWNED BY     B   ALTER SEQUENCE public.players2_id_seq OWNED BY public.players.id;
          public          postgres    false    206            �            1259    16462    types_games    TABLE     �   CREATE TABLE public.types_games (
    id bigint NOT NULL,
    name character varying(40),
    quantity integer,
    created_at time with time zone,
    updated_at time with time zone
);
    DROP TABLE public.types_games;
       public         heap    postgres    false            �            1259    16460    types_games2_id_seq    SEQUENCE     |   CREATE SEQUENCE public.types_games2_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.types_games2_id_seq;
       public          postgres    false    205                        0    0    types_games2_id_seq    SEQUENCE OWNED BY     J   ALTER SEQUENCE public.types_games2_id_seq OWNED BY public.types_games.id;
          public          postgres    false    204            �
           2604    16456 	   events id    DEFAULT     f   ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);
 8   ALTER TABLE public.events ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    203    203            �
           2604    16481 
   players id    DEFAULT     i   ALTER TABLE ONLY public.players ALTER COLUMN id SET DEFAULT nextval('public.players2_id_seq'::regclass);
 9   ALTER TABLE public.players ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    207    207            �
           2604    16465    types_games id    DEFAULT     q   ALTER TABLE ONLY public.types_games ALTER COLUMN id SET DEFAULT nextval('public.types_games2_id_seq'::regclass);
 =   ALTER TABLE public.types_games ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    205    205                      0    16453    events 
   TABLE DATA           g   COPY public.events (id, name, types_game_id, created_at, updated_at, enclosure, date_play) FROM stdin;
    public          postgres    false    203   �                 0    16478    players 
   TABLE DATA           b   COPY public.players (id, name, status_email, event_id, created_at, updated_at, email) FROM stdin;
    public          postgres    false    207   U                 0    16462    types_games 
   TABLE DATA           Q   COPY public.types_games (id, name, quantity, created_at, updated_at) FROM stdin;
    public          postgres    false    205   �       !           0    0    events_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.events_id_seq', 12, true);
          public          postgres    false    202            "           0    0    players2_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.players2_id_seq', 43, true);
          public          postgres    false    206            #           0    0    types_games2_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.types_games2_id_seq', 3, true);
          public          postgres    false    204            �
           2606    16458    events events_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.events DROP CONSTRAINT events_pkey;
       public            postgres    false    203            �
           2606    16483    players players2_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.players
    ADD CONSTRAINT players2_pkey PRIMARY KEY (id);
 ?   ALTER TABLE ONLY public.players DROP CONSTRAINT players2_pkey;
       public            postgres    false    207            �
           2606    16467    types_games types_games2_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.types_games
    ADD CONSTRAINT types_games2_pkey PRIMARY KEY (id);
 G   ALTER TABLE ONLY public.types_games DROP CONSTRAINT types_games2_pkey;
       public            postgres    false    205               �   x�Mλ
�@F�z�)��.���%����&j ��__V��<����5Ks��7Rb1�I��	����VjgF��܈Ę=�����/��e"�%����Y�A��.�`�g��М��>?H�S�i	�EE��ϨSڭ�18�>�.�         [   x�31��*M�S��/N�tLN-(��44�420��54�52S04�2��20ӳ41�50Ɣ22�34�d$&��8��&f��%��r��qqq ֯(         R   x�3�t;��$)?GAW��P!9?��(��42��".#N�R��̒|�s�sNC�
cN�ĤJ�A�0E���PE1z\\\ �e     