class Moderation::ActionPlansController < Moderation::BaseController
  include ModerateActions

  has_filters %w{all}, only: :index
  has_orders %w{created_at}, only: :index

  before_action :load_resources, only: [:index]

  load_and_authorize_resource

  def new
    @resource = resource_model.new
    set_resource_instance
  end

  def create
    @resource = resource_model.new(strong_params)

    if @resource.save
      redirect_to moderation_action_plans_url, notice: t('flash.actions.create.notice', resource_name: "#{resource_name.capitalize}")
    else
      set_resource_instance
      render :new
    end
  end

  def edit
  end

  def update
    resource.assign_attributes(strong_params)
    if resource.save
      redirect_to moderation_action_plans_url, notice: t('flash.actions.update.notice', resource_name: "#{resource_name.capitalize}")
    else
      set_resource_instance
      render :edit
    end
  end

  private

  def action_plan_params
    params.require(:action_plan).permit(:title, :description, :category_id, :subcategory_id, :proposal_ids => [])
  end

  def resource_model
    ActionPlan
  end
end
