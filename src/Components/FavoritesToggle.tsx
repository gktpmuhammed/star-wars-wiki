import React from 'react';
import { Switch, Space } from 'antd';

interface FavoritesToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const FavoritesToggle: React.FC<FavoritesToggleProps> = ({ checked, onChange }) => (
  <Space direction="horizontal">
    <span>Show Favorites Only</span>
    <Switch checked={checked} onChange={onChange} />
  </Space>
);

export default FavoritesToggle;