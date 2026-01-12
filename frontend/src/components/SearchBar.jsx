import { Search } from "lucide-react";
import "./SearchBar.css";

const SearchBar = ({ searchText, onSearch, filters, onFilterChange }) => {
    return (
        <div className="search-section">

            {/* Search Input */}
            <div className="search-bar">
                <Search size={20} />
                <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchText}
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>

            {/* Filters */}
            <div className="filters">

                <select
                    value={filters.priority || ''}
                    onChange={(e) => onFilterChange('priority', e.target.value)}
                    className="filter-select"
                >
                    <option value="">All Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <select
                    value={filters.pinned ?? ''}
                    onChange={(e) =>
                        onFilterChange(
                            'pinned',
                            e.target.value === ''
                                ? ''
                                : e.target.value === 'true'
                        )
                    }
                    className="filter-select"
                >
                    <option value="">All Notes</option>
                    <option value="true">Pinned Only</option>
                    <option value="false">Unpinned Only</option>
                </select>

            </div>
        </div>
    );
};

export default SearchBar;
