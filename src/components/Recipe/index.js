import RecipeMeta from './RecipeMeta';
import CommentContainer from './CommentContainer';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import marked from 'marked';
import { RECIPE_PAGE_LOADED, RECIPE_PAGE_UNLOADED } from '../../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.recipe,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: RECIPE_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: RECIPE_PAGE_UNLOADED })
});

class Recipe extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Recipes.get(this.props.match.params.id),
      agent.Comments.forRecipe(this.props.match.params.id)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.recipe) {
      return null;
    }

    const markup = { __html: marked(this.props.recipe.body, { sanitize: true }) };
    const canModify = this.props.currentUser &&
      this.props.currentUser.username === this.props.recipe.author.username;
    return (
      <div className="recipe-page">

        <div className="banner">
          <div className="container">

            <h1>{this.props.recipe.title}</h1>
            <RecipeMeta
              recipe={this.props.recipe}
              canModify={canModify} />

          </div>
        </div>

        <div className="container page">

          <div className="row recipe-content">
            <div className="col-xs-12">

              <div dangerouslySetInnerHTML={markup}></div>

              <ul className="tag-list">
                {
                  this.props.recipe.tagList.map(tag => {
                    return (
                      <li
                        className="tag-default tag-pill tag-outline"
                        key={tag}>
                        {tag}
                      </li>
                    );
                  })
                }
              </ul>

            </div>
          </div>

          <hr />

          <div className="recipe-actions">
          </div>

          <div className="row">
            <CommentContainer
              comments={this.props.comments || []}
              errors={this.props.commentErrors}
              slug={this.props.match.params.id}
              currentUser={this.props.currentUser} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
