require 'rails_helper'

# Specs in this file have access to a helper object that includes
# the CommentsHelper. For example:
#
# describe CommentsHelper do
#   describe "string concat" do
#     it "concats two strings with spaces" do
#       expect(helper.concat_strings("this","that")).to eq("this that")
#     end
#   end
# end
RSpec.describe CommentsHelper, type: :helper do

  describe '#user_level_class' do

    def comment_double as_administrator: false, as_moderator: false, official: false
      user = double official?: official, official_level: 'Y'
      double as_administrator?: as_administrator, as_moderator?: as_moderator, user: user
    end

    it 'returns is-admin for comment done as administrator' do
      comment = comment_double(as_administrator: true)

      expect(helper.user_level_class(comment)).to eq('is-admin')
    end

    it 'returns is-moderator for comment done as moderator' do
      comment = comment_double(as_moderator: true)

      expect(helper.user_level_class(comment)).to eq('is-moderator')
    end

    it 'returns level followed by official level if user is official' do
      comment = comment_double(official: true)

      expect(helper.user_level_class(comment)).to eq('user-level-Y')
    end

    it 'returns an empty class otherwise' do
      comment = comment_double

      expect(helper.user_level_class(comment)).to eq('')
    end
  end

  describe '#comment_author_class' do
    it 'returns the right class if author is the commenting user' do
      author_id = 42
      comment = double user_id: author_id

      expect(helper.comment_author_class(comment, author_id)).to eq('comment-author')
    end

    it 'returns an empty string if commenter is not the author' do
      author_id = 42
      comment = double user_id: author_id - 1

      expect(helper.comment_author_class(comment, author_id)).to eq('')
    end
  end
end