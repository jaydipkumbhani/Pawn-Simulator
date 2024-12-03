import { Component } from '@angular/core';

@Component({
  selector: 'app-shorting-table',
  templateUrl: './shorting-table.component.html',
  styleUrl: './shorting-table.component.css',
})
export class ShortingTableComponent {
  userDetails = [
    {
      id: 1,
      name: 'Alice',
      state: 'Texas',
      country: 'USA',
      city: 'Austin',
      active: true,
    },
    {
      id: 2,
      name: 'Bob',
      state: 'California',
      country: 'USA',
      city: 'Los Angeles',
      active: false,
    },
    {
      id: 3,
      name: 'Charlie',
      state: 'Maharashtra',
      country: 'India',
      city: 'Mumbai',
      active: true,
    },
    {
      id: 4,
      name: 'David',
      state: 'Karnataka',
      country: 'India',
      city: 'Bangalore',
      active: false,
    },
    {
      id: 5,
      name: 'Eva',
      state: 'Ontario',
      country: 'Canada',
      city: 'Toronto',
      active: true,
    },
    {
      id: 6,
      name: 'Frank',
      state: 'Quebec',
      country: 'Canada',
      city: 'Montreal',
      active: false,
    },
    {
      id: 7,
      name: 'Grace',
      state: 'Queensland',
      country: 'Australia',
      city: 'Brisbane',
      active: true,
    },
    {
      id: 8,
      name: 'Henry',
      state: 'Victoria',
      country: 'Australia',
      city: 'Melbourne',
      active: false,
    },
    {
      id: 9,
      name: 'Ivy',
      state: 'Texas',
      country: 'USA',
      city: 'Dallas',
      active: true,
    },
    {
      id: 10,
      name: 'Jack',
      state: 'Punjab',
      country: 'India',
      city: 'Amritsar',
      active: false,
    },
  ];

  availableCountries: string[] = [];
  availableStates: string[] = [];
  availableCities: string[] = [];

  selectedCountries: string[] = [];
  selectedStates: string[] = [];
  selectedCities: string[] = [];
  selectedActive: boolean[] = [];

  searchQuery: string = '';
  filteredUsers = this.userDetails;

  displayedColumns: string[] = [
    'id',
    'name',
    'state',
    'country',
    'city',
    'active',
  ];

  ngOnInit() {
    this.availableCountries = Array.from(
      new Set(this.userDetails.map((user) => user.country))
    );
    this.availableStates = Array.from(
      new Set(this.userDetails.map((user) => user.state))
    );
    this.availableCities = Array.from(
      new Set(this.userDetails.map((user) => user.city))
    );
  }

  toggleFilter(type: string, value: any) {
    if (type === 'country') {
      this.updateSelection(this.selectedCountries, value);
    } else if (type === 'state') {
      this.updateSelection(this.selectedStates, value);
    } else if (type === 'city') {
      this.updateSelection(this.selectedCities, value);
    } else if (type === 'active') {
      this.updateSelection(this.selectedActive, value);
    }
    this.applyFilters();
  }

  updateSelection(selectionArray: any[], value: any) {
    const index = selectionArray.indexOf(value);
    if (index === -1) {
      selectionArray.push(value);
    } else {
      selectionArray.splice(index, 1);
    }
  }

  applyFilters() {
    this.filteredUsers = this.userDetails.filter((user) => {
      const matchesCountry = this.selectedCountries.length
        ? this.selectedCountries.includes(user.country)
        : true;

      const matchesState = this.selectedStates.length
        ? this.selectedStates.includes(user.state)
        : true;

      const matchesCity = this.selectedCities.length
        ? this.selectedCities.includes(user.city)
        : true;

      const matchesActive = this.selectedActive.length
        ? this.selectedActive.includes(user.active)
        : true;

      const matchesSearch = this.searchQuery
        ? Object.values(user)
            .join(' ')
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        : true;

      return (
        matchesCountry &&
        matchesState &&
        matchesCity &&
        matchesActive &&
        matchesSearch
      );
    });
  }
}
