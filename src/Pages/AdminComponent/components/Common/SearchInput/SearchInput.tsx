import React from 'react';
import './SearchInput.css';

interface SearchInputProps {
    onSearch: (keyword: string) => void;
    placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, placeholder = 'Tìm kiếm' }) => {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = e.target.value;
        onSearch(keyword);
    };

    return (
        <div className='search'>
            <input 
                className='search-input' 
                placeholder={placeholder}
                onChange={handleSearch}
            />
        </div>
    );
};

export default SearchInput; 