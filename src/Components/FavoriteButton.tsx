import React from 'react';
import { Button, Tooltip } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';

export const FavoriteButton: React.FC<{
    characterId: string, isFavorited: (id: string) => boolean,
    addToFavorites: (id: string) => void, removeFromFavorites: (id: string) => void
}> =
    ({ characterId, isFavorited, addToFavorites, removeFromFavorites }) => {
        return (
            <Tooltip title={isFavorited(characterId) ? 'Remove from Favorites' : 'Add to Favorites'}>
                <Button
                    type="default"
                    icon={isFavorited(characterId) ? <StarFilled style={{ color: '#ffcd00' }} /> : <StarOutlined />}
                    onClick={() => isFavorited(characterId) ? removeFromFavorites(characterId) : addToFavorites(characterId)}
                />
            </Tooltip>
        );
    };
