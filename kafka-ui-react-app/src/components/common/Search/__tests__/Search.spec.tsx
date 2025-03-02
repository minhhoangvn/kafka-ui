import { shallow, mount } from 'enzyme';
import Search from 'components/common/Search/Search';
import React from 'react';

jest.mock('use-debounce', () => ({
  useDebouncedCallback: (fn: (e: Event) => void) => fn,
}));

describe('Search', () => {
  const handleSearch = jest.fn();
  it('calls handleSearch on input', () => {
    const component = mount(
      <Search
        handleSearch={handleSearch}
        value=""
        placeholder="Search bt the Topic name"
      />
    );
    component.find('input').simulate('change', { target: { value: 'test' } });
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });

  describe('when placeholder is provided', () => {
    const component = shallow(
      <Search
        handleSearch={handleSearch}
        value=""
        placeholder="Search bt the Topic name"
      />
    );
    it('matches the snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });

  describe('when placeholder is not provided', () => {
    const component = shallow(<Search handleSearch={handleSearch} value="" />);
    it('matches the snapshot', () => {
      expect(component).toMatchSnapshot();
    });
  });
});
