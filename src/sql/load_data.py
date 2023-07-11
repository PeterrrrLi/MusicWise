import pandas as pd
import pdb


def artist(df):
    df = df.drop_duplicates(subset=['artist_id'])
    with open("/Users/Administrator/Downloads/load_artist.sql", 'w') as sql_script:
        sql_script.write("INSERT INTO `heroku_54e3f38f2db2aeb`.`artist` (`artist_ID`, `artist_name`, `artist_rank`) VALUES ")
        for index, row in df.iterrows():
            row['Artist Name'] = row['Artist Name'].replace("'", "")
            sql_script.write(f"\n({row['artist_id']}, '{row['Artist Name']}', 0)")
            sql_script.write(',')
        sql_script.write(";")
    
        
def music_info(df):
    df = df.drop_duplicates(subset=['music_id'])
    with open("/Users/Administrator/Downloads/load_artist.sql", 'r') as artist_sql_script:
        artist_sql_script_content = artist_sql_script.read()
        with open("/Users/Administrator/Downloads/load_music.sql", 'w') as sql_script:
            sql_script.write("INSERT INTO `heroku_54e3f38f2db2aeb`.`music_info` (`music_ID`, `music_title`, `artist_ID`) VALUES ")
            for index, row in df.iterrows():
                if ('(' + str(row['artist_id']) + ',') in artist_sql_script_content:
                    row['Song Name'] = str(row['Song Name']).replace("'", "")
                    sql_script.write(f"\n({(row['music_id'])}, '{row['Song Name']}', {row['artist_id']})")
                    sql_script.write(',')
            sql_script.write(";")
            
            
def spotify_rank(df):
    df = df.drop_duplicates(subset=['music_id'])
    with open("/Users/Administrator/Downloads/load_artist.sql", 'r') as artist_sql_script:
        artist_sql_script_content = artist_sql_script.read()
        with open("/Users/Administrator/Downloads/load_spotify_rank.sql", 'w') as sql_script:
            sql_script.write("INSERT INTO `heroku_54e3f38f2db2aeb`.`spotify_rank` (`music_ID`, `ave_rank`, `total_stream`, `top_10_frequency`) VALUES ")
            for index, row in df.iterrows():
                if ('(' + str(row['artist_id']) + ',') in artist_sql_script_content:
                    sql_script.write(f"\n({(row['music_id'])}, '{0}', '{row['Total Streams']}', {row['Top 10 (xTimes)']})")
                    sql_script.write(',')
            sql_script.write(";")
            
            
def music_age(df):
    df = df.drop_duplicates(subset=['music_id'])
    with open("/Users/Administrator/Downloads/load_artist.sql", 'r') as artist_sql_script:
        artist_sql_script_content = artist_sql_script.read()
        with open("/Users/Administrator/Downloads/load_music_age.sql", 'w') as sql_script:
            sql_script.write("INSERT INTO `heroku_54e3f38f2db2aeb`.`music_age` (`music_ID`, `days`) VALUES ")
            for index, row in df.iterrows():
                if ('(' + str(row['artist_id']) + ',') in artist_sql_script_content:
                    sql_script.write(f"\n({(row['music_id'])}, {row['Days']})")
                    sql_script.write(',')
            sql_script.write(";")
            
            
def peak(df):
    df = df.drop_duplicates(subset=['music_id'])
    with open("/Users/Administrator/Downloads/load_artist.sql", 'r') as artist_sql_script:
        artist_sql_script_content = artist_sql_script.read()
        with open("/Users/Administrator/Downloads/load_peak.sql", 'w') as sql_script:
            sql_script.write("INSERT INTO `heroku_54e3f38f2db2aeb`.`peak` (`music_ID`, `peak_position`, `peak_frequency`, `peak_stream`) VALUES ")
            for index, row in df.iterrows():
                if ('(' + str(row['artist_id']) + ',') in artist_sql_script_content:
                    sql_script.write(f"\n({(row['music_id'])}, {row['Peak Position']}, {1}, {row['Peak Streams']})")
                    sql_script.write(',')
            sql_script.write(";")
    
    
if __name__ == "__main__":
    data_source = "/Users/Administrator/Downloads/Spotify_final_dataset.csv"
    df = pd.read_csv(data_source)
    df = df.dropna()
    df = df.reset_index()
    df['artist_id'] = df.groupby('Artist Name').ngroup()
    df['music_id'] = df.index
    df['artist_rank_init'] = [0] * len(df)
    artist(df)
    music_info(df)
    spotify_rank(df)
    music_age(df)
    peak(df)


