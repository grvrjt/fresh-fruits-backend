import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: {
    versionKey: false,
    timestamps: true,
    id: false,
  },
})
export default class Fruit {
  @ApiProperty()
  @prop({
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    trim: true,
  })
  name: string;

  @ApiProperty()
  @prop({ type: String, required: [true, 'Price  is required'] })
  price: string;

  @ApiProperty()
  @prop({ type: String, required: [true, 'Description is required'] })
  desc: string;

  @ApiProperty()
  @prop({ type: String, required: [true, 'Image is required'] })
  image: string;
}
