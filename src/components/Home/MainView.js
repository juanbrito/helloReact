import { Link } from 'react-router-dom';
import RecipeList from '../RecipeList';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ...state.recipeList,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({ });

const MainView = props => {
  return (
    <div>
		<div>
			<fieldset class="form-group"><input type="text" class="form-control form-control-sm" placeholder="Receta..."/></fieldset>
			<button className="btn btn-primary" type="submit">
				Buscar
			</button>
		</div>
		<Link to={`/ratings`}>Ver valoraciones</Link>
		<RecipeList 
			recipes={props.recipes}
			loading={props.loading}
		/>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
