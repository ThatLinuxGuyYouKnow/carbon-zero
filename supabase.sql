-- supabase.sql

CREATE OR REPLACE FUNCTION public.table_exists(table_name text)
  RETURNS boolean AS
$$
BEGIN
  RETURN EXISTS (
    SELECT *
    FROM information_schema.tables 
    WHERE table_name = $1
  );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.create_table(table_name text)
  RETURNS void AS
$$
BEGIN
  EXECUTE FORMAT('CREATE TABLE %I ();', table_name);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.alter_table(table_name text, columns jsonb[])
  RETURNS void AS 
$$ 
DECLARE 
   column_def TEXT;  
BEGIN  
   FOREACH column_def IN ARRAY columns LOOP  
      EXECUTE format('ALTER TABLE %I ADD COLUMN %s', table_name, column_def::text);    
   END LOOP;   
END; 
$$ LANGUAGE plpgsql;































