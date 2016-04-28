import { Component }          from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import SubcategoryPicker      from './new_subcategory_picker.component';

class CategoryPicker extends Component {
  render () {
    const { categories, category, subcategory } = this.props;
    const subcategories = (categories.length > 0 && category) ? categories
      .filter(c => {
        return c.id === category.id
      })[0]
      .subcategories : [];

    var categoryList = categories.map(c => this.renderRow(c));

    return (
      <div>
        <div className="category-picker">
          <label>{I18n.t("components.category_picker.category.label")}</label>
          <ul>{categoryList}</ul>
        </div>
        <SubcategoryPicker 
          subcategory={subcategory}
          subcategories={subcategories} 
          onSelect={subcategory => this.selectSubcategory(subcategory)} />
      </div>
    );
  }

  renderRow (c) {
    const { category } = this.props;

    var selected = category && category.id === c.id;
    var name = c.name;

    var classNames = ['category-' + c.id];
    if(selected){ classNames.push('selected'); }
    var iconName = "icon category-icon-" + c.id;

    return (
      <li className={classNames.join(' ')}
          key={c.id}
          onClick={() => this.selectCategory(c)}>
        <span className="category">
          <span className={iconName}></span>
          <span className="name">{name}</span>
        </span>
      </li>
    );
  }

  selectCategory(selectedCategory ){
    const { categories, onCategorySelected } = this.props;

    const subcategories = categories
      .filter(category => {
        return category.id === selectedCategory.id
      })[0]
      .subcategories;

    onCategorySelected({
      categoryId: selectedCategory.id,
      subcategoryId: subcategories[0].id
    });
  }

  selectSubcategory(subcategory){
    const { onSubcategorySelected } = this.props;


    onSubcategorySelected(subcategory.id);
  }
}

function mapStateToProps({ categories }) {
  return { categories };
}

export default connect(mapStateToProps)(CategoryPicker);