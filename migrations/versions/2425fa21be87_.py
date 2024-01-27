"""empty message

Revision ID: 2425fa21be87
Revises: 9903b4000191
Create Date: 2024-01-27 23:04:19.011948

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2425fa21be87'
down_revision = '9903b4000191'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pet',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=200), nullable=False),
    sa.Column('born_date', sa.Date(), nullable=False),
    sa.Column('disabilities', sa.String(length=300), nullable=True),
    sa.Column('breed', sa.String(length=100), nullable=False),
    sa.Column('gender', sa.String(length=100), nullable=False),
    sa.Column('animal', sa.String(length=200), nullable=False),
    sa.Column('medical_history', sa.String(length=300), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('pet')
    # ### end Alembic commands ###
