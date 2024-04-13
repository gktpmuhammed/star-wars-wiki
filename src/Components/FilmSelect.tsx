import React from 'react';
import { Select } from 'antd';

interface FilmSelectProps {
  films: string[];
  selectedFilms: string[];
  onChange: (value: string[]) => void;
}

const FilmSelect: React.FC<FilmSelectProps> = ({ films, selectedFilms, onChange }) => (
  <Select
    mode="multiple"
    style={{ width: '300px' }}
    placeholder="Select Films"
    value={selectedFilms}
    maxTagCount='responsive'
    onChange={onChange}
  >
    {films.map((film: string) => (
      <Select.Option key={film} value={film}>
        {film}
      </Select.Option>
    ))}
  </Select>
);

export default FilmSelect;